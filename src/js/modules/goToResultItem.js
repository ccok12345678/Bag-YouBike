import GetAuthorizationHeader from "./getAurthor.js";
import makeInfoCards from "./makeINfoCards.js";
import showCard from "./showCard.js";

const Icon = L.Icon.extend({
  options: {
    iconSize: [57.46, 56],
    iconAnchor: [25, 52],
  }
});

const rentIcon = new Icon({iconUrl: 'images/rent_icon.png'});

export default function goToResultItem(stationData, map, layerGroup) {
  const resultItems = document.querySelectorAll('.searchResultItem');
  resultItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      
      if (e.target.dataset.positionLat === undefined) {
        alert('未提供位置資訊')
        return;
      }

      // set map center
      const lat = parseFloat(e.target.dataset.positionLat)
      const lon = parseFloat(e.target.dataset.positionLon)
      let position = [lat, lon];
      map.setView(position, 16);

      
      // show rent data & marker
      
      // showRentData(lat, lon, map, layerGroup, 3);


      const id = e.target.dataset.stationid;
      const city = document.querySelector('#citySelector').value;

      axios({
        method: 'get',
        baseURL: 'https://ptx.transportdata.tw/MOTC/',
        url: `v2/Bike/Availability/${city}?$format=JSON`,
        headers: GetAuthorizationHeader()    
      })
        .then(res => {
          const bikes = res.data;
          
          makeInfoCards(stationData, bikes, true);
          
          bikes.forEach(bike => {
            let rentBike = bike.AvailableRentBikes;
            if (bike.StationID === id) {
              stationData.forEach(station => {
                if (station.StationID === id) {

                  L.marker([lat, lon], { icon: rentIcon })
                  .bindPopup(`<a title="可借數量" href="#" id="${id}" data-marker="marker" class="map-marker text-primary text-decoration-none" data-item="card-item-search">${rentBike}</a>`, {
                    minWidth: 0,
                    closeButton: false,
                    autoClose: false,
                    closeOnClick: false,
                  })
                  .on("add", event => {
                    event.target.openPopup();
                  }).addTo(map);
        
                  
                  const mapMarker = document.querySelector('.map-marker');
                  mapMarker.addEventListener('click', e => {
                    e.preventDefault();
                    showCard(e);
                    console.log('show card');
                  })
                }
              })

            }
          })
          
        })
        .catch(err => console.log(err));
        
      })
    })

}
import GetAuthorizationHeader from "getAurthor.js";
import makeInfoCards from "makeINfoCards.js";
import showCard from "showCard.js";

const Icon = L.Icon.extend({
  options: {
    iconSize: [57.46, 56],
    iconAnchor: [25, 52],
  }
});

const rentIcon = new Icon({iconUrl: 'images/rent_icon.png'});

export default function goToResultItem(stationData, map) {
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
          const bikeData = [];
          
          bikes.forEach(bike => {
            let rentBike = bike.AvailableRentBikes;
            if (bike.StationID === id) {
              bikeData.push(bike)
              stationData.forEach(station => {
                if (station.StationID === id) {

                  L.marker([lat, lon], { icon: rentIcon })
                  .bindPopup(`<a title="可借數量" href="#" data-marker="marker" class="map-marker text-primary text-decoration-none" data-stationid="${id}">${rentBike}</a>`, {
                    minWidth: 0,
                    closeButton: false,
                    autoClose: false,
                    closeOnClick: false,
                  })
                  .on("add", event => {
                    event.target.openPopup();

                    const mapMarkers = document.querySelectorAll('.map-marker');
                  mapMarkers.forEach(marker => {
                    marker.addEventListener('click', e => {
                      e.preventDefault();
            
                      showCard(e);
                    })
                  })

                  }).addTo(map);
        
                }
              })

            }
          })
          
          makeInfoCards(stationData, bikeData, true);
          
        })
        .catch(err => console.log(err));
        
      })
    })

}
//# sourceMappingURL=goToResultItem.js.map

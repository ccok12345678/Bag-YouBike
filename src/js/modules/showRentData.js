import GetAuthorizationHeader from './getAurthor.js';
import makeInfoCards from './makeINfoCards.js';
import showCard from './showCard.js';


export default function showRentData(nowLat, nowLong, map, layerGroup) {
  
  // custom icon
  const Icon = L.Icon.extend({
    options: {
      iconSize: [57.46, 56],
      iconAnchor: [25, 52],
    }
  });
  
  const rentIcon = new Icon({iconUrl: 'images/rent_icon.png'});
  
  const requestStation = axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bike/Station/NearBy?$top=30&$spatialFilter=nearby(${nowLat},${nowLong},1000)&$format=JSON`,
    headers: GetAuthorizationHeader()    
  });
  const requestAvailability = axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bike/Availability/NearBy?$top=30&$spatialFilter=nearby(${nowLat},${nowLong},1000)&$format=JSON`,
    headers: GetAuthorizationHeader() 
  });

  axios.all([requestStation, requestAvailability])
    .then(axios.spread((...res) => {

      const stations = res[0].data;
      const bikes = res[1].data;

      // info cards
      makeInfoCards(stations, bikes, true);
      
      stations.forEach(item => {
        let stationID = item.StationID;
        let lat = item.StationPosition.PositionLat;
        let long = item.StationPosition.PositionLon;
        let i = 0;
        
        bikes.forEach(bike => {
          if (stationID === bike.StationID) {
            let rentBike = bike.AvailableRentBikes;
            
            layerGroup.addLayer(
              L.marker([lat,long], { icon: rentIcon })
              .bindPopup(`<a title="可借數量" href="#" id="${stationID}" data-marker="marker" class="map-marker text-primary text-decoration-none" data-item="card-item-${i}">${rentBike}</a>`, {
                minWidth: 0,
                closeButton: false,
                autoClose: false,
                closeOnClick: false,
              })
              .on("add", event => {
                event.target.openPopup();
              }))
            }

          i++;
        })
        
      })
      layerGroup.addTo(map);

      const mapMarkers = document.querySelectorAll('.map-marker');
      mapMarkers.forEach(marker => {
        marker.addEventListener('click', e => {
          e.preventDefault();
          showCard(e);
        })
      })
    }))
    .catch(err => console.log(err));
}


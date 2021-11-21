import GetAuthorizationHeader from './getAurthor.js';
import makeInfoCards from './makeINfoCards.js';
import showCard from './showCard.js';


export default function showRentData(nowLat, nowLong, map, layerGroup, num = 30) {
  
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
    url: `v2/Bike/Station/NearBy?$top=${num}&$spatialFilter=nearby(${nowLat},${nowLong},1000)&$format=JSON`,
    headers: GetAuthorizationHeader()    
  });
  const requestAvailability = axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bike/Availability/NearBy?$top=${num}&$spatialFilter=nearby(${nowLat},${nowLong},1000)&$format=JSON`,
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
        
        bikes.forEach(bike => {
          if (stationID === bike.StationID) {
            let rentBike = bike.AvailableRentBikes;
            
            layerGroup.addLayer(
              L.marker([lat,long], { icon: rentIcon })
              .bindPopup(`<a title="可借數量" href="#" id="${stationID}" data-marker="marker" class="map-marker text-primary text-decoration-none" data-stationid="${stationID}">${rentBike}</a>`, {
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

              }))
            }

        })
        
      })
      layerGroup.addTo(map);

    }))
    .catch(err => console.log(err));
}


//# sourceMappingURL=showRentData.js.map

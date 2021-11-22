import GetAuthorizationHeader from 'getAurthor.js';
import makeInfoCards from 'makeINfoCards.js';
import showCard from 'showCard.js';

export default function showReturnData(nowLat, nowLong, map, layerGroup) {
  const Icon = L.Icon.extend({
    options: {
      iconSize: [57.46, 56],
      iconAnchor: [25, 52],
    }
  });
  
  const returnIcon = new Icon({iconUrl: 'images/return_icon.png'});
  
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
      makeInfoCards(stations, bikes, false);

      stations.forEach(item => {
        let stationID = item.StationID;
        let lat = item.StationPosition.PositionLat;
        let long = item.StationPosition.PositionLon;
        
        bikes.forEach(bike => {
          if (stationID === bike.StationID) {
            let returnBike = bike.AvailableReturnBikes;

            layerGroup.addLayer(
              L.marker([lat,long], { icon: returnIcon })
                .bindPopup(`<a title="可還車位" href="#" id="${stationID}" data-marker="marker" class="map-marker text-secondary text-decoration-none" data-stationid="${stationID}"">${returnBike}</a>`, {
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
//# sourceMappingURL=showReturnData.js.map

import GetAuthorizationHeader from './getAurthor.js';

// custom icon
const Icon = L.Icon.extend({
  options: {
    iconSize: [57.46, 56],
    iconAnchor: [25, 52],
  }
});

const rentIcon = new Icon({iconUrl: 'images/rent_icon.png'});
const returnIcon = new Icon({iconUrl: 'images/return_icon.png'});

// let markers = new L.layerGroup();

export function showRentData(nowLat, nowLong, map, layerGroup) {
  
  // clear exisit markers layer??

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

  
  if (document.querySelector('.map-marker')) {

  }
  

  axios.all([requestStation, requestAvailability])
    .then(axios.spread((...res) => {

      const stations = res[0].data;
      const bikes = res[1].data;
      
      stations.forEach(item => {
        let stationID = item.StationID;
        let lat = item.StationPosition.PositionLat;
        let long = item.StationPosition.PositionLon;
        
        bikes.forEach(bike => {
          if (stationID === bike.StationID) {
            let rentBike = bike.AvailableRentBikes;

            layerGroup.addLayer(
              L.marker([lat,long], { icon: rentIcon })
                .bindPopup(`<a title="可借數量" href="#" id="${stationID}" class="map-marker text-primary text-decoration-none">${rentBike}</a>`, {
                  minWidth: 0,
                  closeButton: false,
                  autoClose: false,
                  closeOnClick: false,
                  // keepInview: true
                })
                .on("add", event => {
                  event.target.openPopup();
            }))
          }
        })
        
      })
      layerGroup.addTo(map);
    }))
    .catch(err => console.log(err));
}

export function showReturnData(nowLat, nowLong, map, layerGroup) {
  
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

  
  if (document.querySelector('.map-marker')) {

  }
  

  axios.all([requestStation, requestAvailability])
    .then(axios.spread((...res) => {

      const stations = res[0].data;
      const bikes = res[1].data;
      
      stations.forEach(item => {
        let stationID = item.StationID;
        let lat = item.StationPosition.PositionLat;
        let long = item.StationPosition.PositionLon;
        
        bikes.forEach(bike => {
          if (stationID === bike.StationID) {
            let returnBike = bike.AvailableReturnBikes;

            layerGroup.addLayer(
              L.marker([lat,long], { icon: returnIcon })
                .bindPopup(`<a title="可還車位" href="#" id="${stationID}" class="map-marker text-secondary text-decoration-none">${returnBike}</a>`, {
                  minWidth: 0,
                  closeButton: false,
                  autoClose: false,
                  closeOnClick: false,
                  // keepInview: true
                })
                .on("add", event => {
                  event.target.openPopup();
            }))
          }
        })
        
      })
      layerGroup.addTo(map);
    }))
    .catch(err => console.log(err));
    
}
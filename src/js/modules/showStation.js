// import axios from 'axios';
import GetAuthorizationHeader from './getAurthor.js';

// custom icon
const Icon = L.Icon.extend({
  options: {
    iconSize: [57.46, 56],
    iconAnchor: [25, 52],
  }
});

const rentIcon = new Icon({iconUrl: 'images/rent_icon.png'});
const turntIcon = new Icon({iconUrl: 'images/turn_icon.png'});

export default function showStationData(nowLat, nowLong, map) {

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


      stations.forEach(item => {
        let stationID = item.StationID;
        let lat = item.StationPosition.PositionLat;
        let long = item.StationPosition.PositionLon;
        
        bikes.forEach(bike => {
          if (stationID === bike.StationID) {
            let rentBike = bike.AvailableRentBikes;
            let returnBike = bike.AvailableReturnBikes;
            // console.log(status);
            
            L.marker([lat,long], { icon: rentIcon })
            .bindPopup(`${rentBike}`, {
              minWidth: 0,
              closeButton: false,
              autoClose: false,
              closeOnClick: false
            })
            .on("add", function (event) {
              event.target.openPopup();
            })
            .addTo(map);
          }
        })
        

      })

    }))
    .catch(err => console.log(err));
    
}
  
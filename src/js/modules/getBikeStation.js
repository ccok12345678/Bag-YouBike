import GetAuthorizationHeader from './getAurthor.js';


export default function getBikeStation() {

  navigator.geolocation.getCurrentPosition(success, error);

}

function success(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bike/Availability/NearBy?$top=30&$spatialFilter=nearby(${lat}%2C${long}%2C%201000)&$format=JSON`,
    headers: GetAuthorizationHeader()
  })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));

}

function error(err) {
  console.warn(err.message);
}
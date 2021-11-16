import GetAuthorizationHeader from './getAurthor.js';

export default function getBikeStation() {

  axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bike/Availability/NearBy?$top=30&$spatialFilter=nearby(24.6870676%2C120.9073661%2C%201000)&$format=JSON`,
    headers: GetAuthorizationHeader()
  })
    .then(res => {
      // console.log(res.data);
    })
    .catch(err => console.log(err));
}
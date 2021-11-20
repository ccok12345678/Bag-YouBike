import GetAuthorizationHeader from "./getAurthor.js";
import showSearchResult from "./showSearchResult.js";

export default function searchStation(map, layerGroup) {
  const city = document.querySelector('#citySelector').value;
  const keyword = document.querySelector('#searchKeyword').value;

  if (!city) {
    alert('請選擇區域');
    return;
  }

  axios({
    method: 'get',
    baseURL: 'https://ptx.transportdata.tw/MOTC/',
    url: `v2/Bike/Station/${city}?$format=JSON`,
    headers: GetAuthorizationHeader()    
  })
    .then(res => {
      const stationData = res.data;
      const stationInSearch = [];

      if (!keyword) {
        showSearchResult(stationData, map, layerGroup);
      } else {
        stationData.forEach(station => {
          let id = station.StationID;
          let name = station.StationName.Zh_tw;
          let address = station.StationAddress.Zh_tw;
          const key = new RegExp(keyword);
          
          if (key.test(id) || key.test(name) || key.test(address)) {
            stationInSearch.push(station);
          }

        })
        showSearchResult(stationInSearch, map, layerGroup);
      }


    })
    .catch(err => console.log(err));
}
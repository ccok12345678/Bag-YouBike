export default function showMap() {
  // 設定地圖物件
  const map = L.map('map', {
    center: [24.6870676,120.9073661], // 地圖中心座標 => 取得使用者位置
    zoom: 16,                          // zoom 比例
    zoomControl: false,
  })
  
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      minzoom: 10,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiY2NvazEyMzQ1Njc4IiwiYSI6ImNrdm94Z3M2eDB1N2cycHFoeDl3cjdjZTUifQ.fjYGDdcuHXFwRD1Tc2yq6w'
  }).addTo(map);

  L.control.zoom({
    position: 'topright',
  }).addTo(map);

}

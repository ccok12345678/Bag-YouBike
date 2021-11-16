export default function showMap() {
  // 設定地圖物件
  const map = L.map('map', {
    center: [24.6763905,120.9137315], // 地圖中心座標
    zoom: 13                          // zoom 比例
  })
  
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 16,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiY2NvazEyMzQ1Njc4IiwiYSI6ImNrdm94Z3M2eDB1N2cycHFoeDl3cjdjZTUifQ.fjYGDdcuHXFwRD1Tc2yq6w'
  }).addTo(map);
}

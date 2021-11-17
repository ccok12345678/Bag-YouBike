import currentSpot from "./currentSpot.js";

export default function showMap(map) {
    
  map.locate({
    enableHighAccurcy: true,
  }).on('locationfound', obj => {
    const location = [obj.latlng.lat, obj.latlng.lng];

    currentSpot(location, map)
    map.setView(location, 16);    
  })
  .on('locationerror', err => {
    alert('無法取得您的位置，請開啟定位功能');
    console.warn(err.message);
    map.setView([22.9925951,120.2050199], 16);
  });
  
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

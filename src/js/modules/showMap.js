import currentSpot from "./currentSpot.js";

export default function showMap(lat, long, map) {

  if (typeof(map) === undefined) {
    map = L.map('map', {
      closePopupOnClick: false
    });
  }

  map.setView([lat, long], 16);
  currentSpot([lat, long], map)

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      minzoom: 10,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiY2NvazEyMzQ1Njc4IiwiYSI6ImNrdm94Z3M2eDB1N2cycHFoeDl3cjdjZTUifQ.fjYGDdcuHXFwRD1Tc2yq6w'
  }).addTo(map);

}

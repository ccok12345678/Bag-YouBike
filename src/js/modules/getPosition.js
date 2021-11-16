import showMap from "./showMap.js"; 

export default function getPosition() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function success(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;

  console.log([lat, long]);

  showMap(lat, long);
}

function error(err) {
  console.warn(err.message);
}
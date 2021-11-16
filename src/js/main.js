// import showMap from "./modules/map.js";
import getPosition from './modules/getPosition.js';
import toggleCover from './modules/toggleCover.js';
import getBikeStation from './modules/getBikeStation.js';

document.addEventListener('click', (e) => {
  toggleCover(e);
})

const stationInfo = document.querySelector('#stationInfo');
stationInfo.addEventListener('click', (e) => {
  getBikeStation();
})


init();

function init() {
  // showMap()
  getPosition();
}

// bs tooltip
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
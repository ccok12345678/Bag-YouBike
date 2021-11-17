import toggleCover from './modules/toggleCover.js';
import showMap from './modules/showMap.js';
import getBikeStation from './modules/getBikeStation.js';

// map object
const map = L.map('map', {
  closePopupOnClick: false
});

// eventListener
document.addEventListener('click', (e) => {
  toggleCover(e);
})

const stationInfo = document.querySelector('#stationInfo');
stationInfo.addEventListener('click', (e) => {
  getBikeStation(map);
})

// init
init();

function init() {
  showMap(map)
}

// bs tooltip
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
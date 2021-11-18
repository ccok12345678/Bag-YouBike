import toggleCover from './modules/toggleCover.js';
import showMap from './modules/showMap.js';
import getLocation from './modules/getlocation.js';
import { showRentData } from './modules/showStation.js';
import toggleBtns from './modules/toggleBtns.js';

// map object
const map = L.map('map', {
  closePopupOnClick: false
});
let markers = new L.layerGroup().addTo(map);

// eventListener
const btnGroupBike = document.querySelector('#btnGroup-bike');
const stationInfo = document.querySelector('#stationInfo');
const navBarBtn = document.querySelectorAll('.nav-link');
const stationLocation = document.querySelector('#stationLocation');

document.addEventListener('click', e => {
  toggleCover(e);
})

navBarBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    if (e.target.id !== 'stationInfo')
      btnGroupBike.className = 'btn-group visually-hidden';
  })
})

stationInfo.addEventListener('click', e => {
  e.preventDefault();
  getLocation(map, markers, showRentData);
  btnGroupBike.className = 'btn-group';
})
btnGroupBike.addEventListener('click', e => {
  e.preventDefault();
  toggleBtns(e, map, markers);
})

stationLocation.addEventListener('click', e => {
  e.preventDefault()

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
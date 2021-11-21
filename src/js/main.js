import toggleCover from './modules/toggleCover.js';
import showMap from './modules/showMap.js';
import getLocation from './modules/getlocation.js';
import showRentData from './modules/showRentData.js';
import toggleBtns from './modules/toggleBtns.js';
import hideCard from './modules/hideCard.js';
import searchStation from './modules/searchStation.js';
import clearLayers from './modules/clearLayers.js';

// map object
const map = L.map('map', {
  closePopupOnClick: false
});
const markers = new L.layerGroup().addTo(map);

// eventListener
const btnGroupBike = document.querySelector('#btnGroup-bike');
const stationInfo = document.querySelector('#stationInfo');
const navBarBtn = document.querySelectorAll('.nav-link');
const citySelector = document.querySelector('#citySelector');
const searchStationBtn = document.querySelector('#searchStationBtn');
const mapObj = document.querySelector('#map');

// toggle
document.addEventListener('click', e => {
  toggleCover(e);
  hideCard(e);
  
})

// nav bar, close cover
navBarBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    if (e.target.id !== 'stationInfo')
    btnGroupBike.className = 'btn-group visually-hidden';
  })
})

// station info
stationInfo.addEventListener('click', e => {
  e.preventDefault();
  clearLayers(markers);
  getLocation(map, markers, showRentData);
  btnGroupBike.className = 'btn-group';

})
btnGroupBike.addEventListener('click', e => {
  e.preventDefault();
  clearLayers(markers);
  toggleBtns(e, map, markers);
})

// search station
citySelector.addEventListener('change', e => {
  e.preventDefault();
  clearLayers(markers);
  searchStation(map, markers);
})

searchStationBtn.addEventListener('click', e => {
  e.preventDefault();
  clearLayers(markers);
  searchStation(map, markers);
})

// init
init();

function init() {
  getLocation(map, markers, showMap)
}

// bs tooltip
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// bs offcanvas
const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
const offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
  return new bootstrap.Offcanvas(offcanvasEl)
})
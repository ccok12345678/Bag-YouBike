import toggleCover from './modules/toggleCover.js';
import showMap from './modules/showMap.js';
import getLocation from './modules/getlocation.js';
import showRentData from './modules/showRentData.js';
import toggleBtns from './modules/toggleBtns.js';
import showCard from './modules/showCard.js';
import hideCard from './modules/hideCard.js';
import searchStation from './modules/searchStation.js';

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

mapObj.addEventListener('click', e => {
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
  getLocation(map, markers, showRentData);
  btnGroupBike.className = 'btn-group';

})
btnGroupBike.addEventListener('click', e => {
  e.preventDefault();
  toggleBtns(e, map, markers);
})

// info card
// if (document.querySelector('.map-marker')) {
//   const mapMarkers = document.querySelectorAll('.map-marker');
//   mapMarkers.forEach(marker => {
//     marker.addEventListener('click', e => {
//       e.preventDefault();
//       console.log(e.target.id);
//       showCard(e);
//     })
//   })
// }

// search station
citySelector.addEventListener('change', e => {
  e.preventDefault();
  searchStation(map, markers);
})

searchStationBtn.addEventListener('click', e => {
  e.preventDefault();
  searchStation(map, markers);
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

// bs offcanvas
const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
const offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
  return new bootstrap.Offcanvas(offcanvasEl)
})
import toggleCover from './modules/toggleCover.js';
import showMap from './modules/showMap.js';
import getLocation from './modules/getlocation.js';
import showRentData from './modules/showRentData.js';
import toggleBtns from './modules/toggleBtns.js';
import hideCard from './modules/hideCard.js';
import searchStation from './modules/searchStation.js';
import clearLayers from './modules/clearLayers.js';
import searchRoute from './modules/searchRoute.js';

// map object
const map = L.map('map', {
  closePopupOnClick: false
});

const markers = new L.layerGroup().addTo(map);

L.control.zoom({
  position: 'topright',
}).addTo(map);


// eventListener
const btnGroupBike = document.querySelector('#btnGroup-bike');
const stationInfo = document.querySelector('#stationInfo');
const navBarBtn = document.querySelectorAll('.nav-link');
const citySelector = document.querySelector('#citySelector');
const searchStationBtn = document.querySelector('#searchStationBtn');
// const mapObj = document.querySelector('#map');
const citySelectorRoute = document.querySelector('#citySelectorForRoute');
const bikeRouteSearch = document.querySelector('#bikeRouteSearch');
const informationItems =　document.querySelectorAll('.informationItem');
const slideForAnswer = document.querySelector('#slideForAnswer');
const navInfo = document.querySelector('#websiteInfo');

// toggle
document.addEventListener('click', e => {
  toggleCover(e);
  hideCard(e);
  
})

// nav bar, close cover
navBarBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault()
    clearLayers(markers);

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

// route search
citySelectorRoute.addEventListener('change', e => {
  e.preventDefault();
  searchRoute();
})

// information
informationItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();

    if (slideForAnswer.className === 'slideAnswerContainer vh-100 bg-white hideAnswer') {
      slideForAnswer.className = 'slideAnswerContainer vh-100 bg-white';
    } else {
      slideForAnswer.className = 'slideAnswerContainer vh-100 bg-white hideAnswer';
    }
  })
})

navInfo.addEventListener('click', e => {
  e.preventDefault();
  slideForAnswer.className = 'slideAnswerContainer vh-100 bg-white hideAnswer';
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
//# sourceMappingURL=main.js.map

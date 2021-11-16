import showMap from "./modules/map.js";
import toggleCover from './modules/toggleCover.js'

document.addEventListener('click', (e) => {
  toggleCover(e);
})

init();

function init() {
  showMap()
}

// bs tooltip
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
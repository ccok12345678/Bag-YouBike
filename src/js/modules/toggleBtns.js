import getLocation from "./getlocation.js";
import { showRentData, showReturnData } from "./showStation.js";
import clearLayers from "./clearLayers.js";

export default function toggleBtns(e, map, layerGroup) {
  const rentBtn = document.querySelector('#btn-rentBike');
  const returnBtn = document.querySelector('#btn-returnBike');

  if (e.target.id === 'btn-rentBike') {
    rentBtn.className ='btn btn-secondary text-primary fw-600 px-3 py-2';
    returnBtn.className = 'btn btn-primary fw-600 px-3 py-2';
    clearLayers(layerGroup);
    getLocation(map, layerGroup, showRentData);
  } else {
    rentBtn.className ='btn btn-primary fw-600 px-3 py-2';
    returnBtn.className = 'btn btn-secondary text-primary fw-600 px-3 py-2';
    clearLayers(layerGroup);
    getLocation(map, layerGroup, showReturnData);
  
  }
}
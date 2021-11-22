import showStationData from "./showStation.js";

export default function getBikeStation(map) {

  map.locate({
    enableHighAccurcy: true,
  }).on('locationfound', obj => {
    const [lat, long] = [obj.latlng.lat, obj.latlng.lng];

    showStationData(lat, long, map);
  })
  .on('locationerror', err => {
    alert('無法取得您的位置，請開啟定位功能');
    console.warn(err.message);
  });
}


//# sourceMappingURL=getBikeStation.js.map

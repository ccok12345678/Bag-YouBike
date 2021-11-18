export default function getLocation(map, layerGroup, func) {

  map.locate({
  enableHighAccurcy: true,
  }).on('locationfound', obj => {
  let nowLat = obj.latlng.lat,
      nowLong = obj.latlng.lng;
  
  func(nowLat, nowLong, map, layerGroup);
  })
  .on('locationerror', err => {
  alert('無法取得您的位置，請開啟定位功能');
  console.warn(err.message);
  });

}


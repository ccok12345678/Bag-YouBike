import goToResultItem from "./goToResultItem.js";

export default function showSearchResult(stationData, map, layerGroup) {
  const resultContainer = document.querySelector('#searchResultContainer');  
  let result = '';
  
  if (stationData.length === 0) {
    result = `<div class="alert alert-light text-center" role="alert">
                無資料
              </div>
    `;
    resultContainer.innerHTML = result;
    return;
  }



  stationData.forEach(station => {
    let id = station.StationID;
    let name = station.StationName.Zh_tw;
    let address = (station.StationAddress.Zh_tw !== undefined) ? station.StationAddress.Zh_tw : '無地址資訊';

    let positionLat = station.StationPosition.PositionLat;
    let positionLon = station.StationPosition.PositionLon;
    
    // console.log(id, name, address, position);

    result += `
      <a class="searchResultItem list-group-item list-group-item-action border-0 border-bottom p-3 pe-4 d-flex flex-column" href="#" data-position-Lat="${positionLat}" data-position-Lon="${positionLon}" data-stationID="${id}" title="顯示站點位置">
        <h5 class="fs-16 fw-600" data-position-Lat="${positionLat}" data-position-Lon="${positionLon}" data-stationID="${id}">${name}</h5>
        <p class="text-info fs-12 lh-sm mt-auto mb-0" data-position-Lat="${positionLat}" data-position-Lon="${positionLon}" data-stationID="${id}">${address}</p>
      </a>
    `;

  });

  resultContainer.innerHTML = result;

  goToResultItem(stationData, map, layerGroup)

}
export default function makeInfoCards(stations, bikes, isRent) {

  const cardContainer = document.querySelector('#cardContainer');
  let cards = [];
  
  stations.forEach(station => {
    let nameZh = station.StationName.Zh_tw;
    let nameEn = station.StationName.En;
    let adZh = station.StationAddress.Zh_tw;
    let adEn = station.StationAddress.En;
    let time = station.SrcUpdateTime;
    
    cards.push({
      nameZh,
      nameEn,
      adZh,
      adEn,
      time,
    });
  })
  
  console.log(cards);
  let cardContent = '';
  let i = 0;
  
  bikes.forEach(bike => {
    
    let status = bike.ServiceStatus;
    let id = bike.StationID;
    let rentNum = bike.AvailableRentBikes;
    let returnNum = bike.AvailableReturnBikes;
    let bikeNum = '';
    
    if (status === 1) {
      status = `
      <small class="d-flex align-items-center" data-item="card-item">
      <img src="images/dot_blue.png" class="me-2" width="9" alt="正常營運" data-item="card-item">
      正常營運
      </small>
      `;
      
      if (isRent) {
        bikeNum = `
          <div class="col bg-secondary text-center me-4 rounded p-3" data-item="card-item">
            <h6 class="fw-700 fs-19 mb-2" data-item="card-item">可借車輛</h6>
            <p class="fw-700 fs-36 m-0" data-item="card-item">${rentNum}</p>
          </div>
          <div class="col bg-primary text-white text-center rounded p-3" data-item="card-item">
            <h6 class="fw-700 fs-19 mb-2" data-item="card-item">可停車位</h6>
            <p class="fw-700 fs-36 m-0" data-item="card-item">${returnNum}</p>
          </div>
        `;
      } else {
        bikeNum = `
          <div class="col bg-primary text-white text-center me-4 rounded p-3" data-item="card-item">
            <h6 class="fw-700 fs-19 mb-2" data-item="card-item">可借車輛</h6>
            <p class="fw-700 fs-36 m-0" data-item="card-item">${rentNum}</p>
          </div>
          <div class="col bg-secondary text-center rounded p-3" data-item="card-item">
            <h6 class="fw-700 fs-19 mb-2" data-item="card-item">可停車位</h6>
            <p class="fw-700 fs-36 m-0" data-item="card-item">${returnNum}</p>
          </div>
        `;
      }

    } else if (status === 2) {
      status = `
      <small class="d-flex align-items-center" data-item="card-item">
        <img src="images/dot_yellow.png" class="me-2" width="9" data-item="card-item" alt="暫停營運">
        暫停營運
      </small>
      `;
    } else {
      status = `
      <small class="d-flex align-items-center" data-item="card-item">
        <img src="images/dot_red.png" class="me-2" width="9" data-item="card-item" alt="停止營運">
        停止營運
      </small>
      `;
    }


    cardContent += `
      <div data-id="${id}" class="card shadow pt-3 pb-4 px-4 visually-hidden" data-item="card-item">
        <div class="card-body p-0 fs-12 text-primary" data-item="card-item">
          ${status}
          <h5 class="card-title fw-700 fs-20 mb-1" data-item="card-item">${cards[i].nameZh}</h5>
          <h6 class="card-subtitle mb-2 text-info mb-3 pb-1" data-item="card-item">${cards[i].nameEn}</h6>
          <p class="card-text mb-0 fw-500" data-item="card-item">${cards[i].adZh}</p>
          <p class="card-text text-info mb-3 pb-1" data-item="card-item">${cards[i].adEn}</p>
          <p class="card-text text-info fw-400" data-item="card-item">更新時間︰${cards[i].time}</p>
          <dic class="row mx-0" data-item="card-item">
            ${bikeNum}
          </div>
        </div>
      </div>
    `;
    i++;
  })
  cardContainer.innerHTML = cardContent;
  
}

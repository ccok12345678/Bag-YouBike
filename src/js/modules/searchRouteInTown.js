export default function searchRouteInTown(routeData) {
  const town = document.querySelector('#townSelector').value;
  const key = new RegExp(town)
  const routeContainer = document.querySelector('#routeResultContainer');
  const routeResult = [];
  let routes = '';

  routeData.forEach(route => {
    if (key.test(route.Town)) 
      routeResult.push(route);
  });

  routeResult.forEach(route => {
    let name = route.RouteName;
    let start = route.RoadSectionStart || '無資料';
    let end = route.RoadSectionEnd || '無資料';
    let length = route.CyclingLength || '無資料';
    let direction = route.Direction || '無資料';

    routes += `
      <a href="#" class="searchResultItem list-group-item list-group-item-action border-0 border-bottom p-3 pe-4" title='顯示路線位置'>
        <h5 class="fw-700 fs-14 mb-0">${name}</h5>
        <p class="fw-500 fs-14 mb-0">起點：${start}</p>
        <p class="fw-500 fs-14 mb-0">終點：${end}</p>
        <small class="fs-12">${length}m</small>
        <small class="fs-12 text-info ms-4">${direction}</small>
    `;
  })

  routeContainer.innerHTML = routes;

}
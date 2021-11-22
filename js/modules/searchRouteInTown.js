import showRoute from "showRoute.js";


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
    let length = route.CyclingLength + 'm' || '';
    let direction = route.Direction || '';
    let routeSection = route.Geometry || '無資料';

    routes += `
      <a href="#" class="searchRouteResult list-group-item list-group-item-action border-0 border-bottom p-3 pe-4" title="顯示路線位置" data-section="${routeSection}">
      <h5 class="fw-700 mb-1 fs-15 mb-0" data-section="${routeSection}">${name}</h5>
        <p class="fw-500 fs-14 mb-0" data-section="${routeSection}">起點：${start}</p>
        <p class="fw-500 mb-1 fs-14 mb-0" data-section="${routeSection}">終點：${end}</p>
        <small class="fs-12 lh-sm
        lh-sm" data-section="${routeSection}">${length}</small>
        <small class="fs-12 lh-sm
        lh-sm text-info ms-4" data-section="${routeSection}">${direction}</small>
      </a>
    `;
  })

  routeContainer.innerHTML = routes;

  const searchRouteResults = document.querySelectorAll('.searchRouteResult');
  searchRouteResults.forEach(result => {
    result.addEventListener('click', e => {
      e.preventDefault()

      // the show route function
      showRoute(e);

    })
  })

}
//# sourceMappingURL=searchRouteInTown.js.map

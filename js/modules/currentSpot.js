export default function currentSpot(location, map) {
  L.marker(location, {
    minWidth: 0,
    closeButton: false,
    autoClose: true
  })
    .addTo(map);
}
//# sourceMappingURL=currentSpot.js.map

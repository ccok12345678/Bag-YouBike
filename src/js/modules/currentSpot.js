export default function currentSpot(location,map) {
  L.marker(location)
    .addTo(map);
}
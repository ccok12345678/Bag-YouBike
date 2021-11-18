export default function clearLayers(layerGroup) {
  if (document.querySelector('.map-marker'))
    layerGroup.clearLayers()
}
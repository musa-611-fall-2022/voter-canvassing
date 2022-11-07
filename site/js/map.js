/*
INITIALIZE BASE MAP TO SHOW
*/

let baseMapEl = document.querySelector("#map-component");
export let baseMap = L.map(baseMapEl, { zoomControl: false }).setView([40, -75.15], 11);
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=10b978ef-d3a8-4d87-84d7-9233488f7d37', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(baseMap);

/*
FUNCTION TO SHOW VOTERS ON THE MAP
*/

// What happens when voter marker gets clicked
function voterMarkerOnClick(event) {
  console.log(event.layer.feature.properties.id);
}

// Adjust bounds
function getAdjustedBounds(layers) {
  let bounds = layers.getBounds();
  let adjustRatio = 0.15;
  const northLat = bounds._northEast.lat;
  const southLat = bounds._southWest.lat;
  const latRange = northLat - southLat;
  const adjustAmount = latRange * adjustRatio;
  bounds._southWest.lat = southLat + adjustAmount;
  bounds._northEast.lat = northLat + adjustAmount;

  return bounds;
}

function showVotersOnMap(voters) {
  if(baseMap.voterLayers != undefined) {
    baseMap.removeLayer(baseMap.voterLayers);
  }
  baseMap.voterLayers = L.geoJSON(voters, {
    pointToLayer: (point, latLng) => L.circleMarker(latLng),
    style: {
      radius: 7,
      color: "#0d59a9",
      stroke: true,
      opacity: 0.5,
      weight: 1,
    },
  })
  .on("click", voterMarkerOnClick)
  .bindPopup(point => point.feature.properties.last_name)
  .addTo(baseMap);

  let bounds = getAdjustedBounds(baseMap.voterLayers);
  baseMap.fitBounds(bounds);
}

export {
  showVotersOnMap,
};

/* Requirement:
A leaflet map to show voter locations;
The leaflet map object should be available on the global window;
*/

window.voterMap = baseMap;
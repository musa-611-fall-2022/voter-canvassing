import { onSelectAction } from "./selected-voter.js";

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
FUNCTION TO MAKE FEATURE COLLECTION FROM DATA
*/

// Util function to make sure coords are valid
function coordsAreValid(lng, lat) {
  let result = false;
  if(typeof(lng) == "number" && typeof(lat) == "number") {
    if(lng < -73 && lng > -77 && lat < 41 && lat > 38) {
      result = true;
    }
  }
  return result;
}
// Function to make feature collection out of the imported data
// Record only key information
function makeVoterFeatureCollection(thisData) {

  // Construct a geojson empty frame
  const voters = {
    type: "FeatureCollection",
    features: [],
  };

  // Write into geojson
  console.log(thisData.length);
  for(let i = 0; i < thisData.length; i++) {
    let thisLngLat = thisData[i]["TIGER/Line Lng/Lat"];
    if(typeof(thisLngLat) == "string"){

      let thisLng = Number(thisLngLat.split(",")[0]);
      let thisLat = Number(thisLngLat.split(",")[1]);

      if(coordsAreValid(thisLng, thisLat)) {
        voters.features.push( {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [thisLng, thisLat],
          },
          "properties": {
              "id": thisData[i]["ID Number"],
              "last_name": thisData[i]["Last Name"],
              "first_name": thisData[i]["First Name"],
              "address": thisData[i]["TIGER/Line Matched Address"],
          },
        });
      }
    }
  }
  return voters;
}

/*
FUNCTION TO SHOW VOTERS ON THE MAP
*/

// What happens when voter marker gets clicked
function voterMarkerOnClick(event) {
  onSelectAction(event.layer.feature.properties.id);
}

function showVotersOnMap(thisData) {
  let voterFeatures = makeVoterFeatureCollection(thisData);
  if(baseMap.voterLayers !== undefined) {
    baseMap.removeLayer(baseMap.voterLayers);
  }
  baseMap.voterLayers = L.geoJSON(voterFeatures, {
    pointToLayer: (point, latLng) => L.circleMarker(latLng),
    style: {
      radius: 7,
      color: "#aaaaaa",
      stroke: true,
      opacity: 0.5,
      weight: 1,
    },
  })
  .on("click", voterMarkerOnClick)
  .bindPopup(point => point.feature.properties.last_name)
  .addTo(baseMap);
}

/*
FUNCTION THAT ZOOM TO CURRENT BOUNDS
*/

// Adjust bounds
// We have a voter list which blocks part of the view port
// Therefore we need to move the bounds a bit northward
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

// Fit map to bounds
function fitMap() {
  // Fit voters on the map
  let bounds = getAdjustedBounds(baseMap.voterLayers);
  baseMap.fitBounds(bounds);
}


export {
  showVotersOnMap,
  fitMap,
  voterMarkerOnClick,
  makeVoterFeatureCollection,
};

/* Requirement:
A leaflet map to show voter locations;
The leaflet map object should be available on the global window;
*/

window.voterMap = baseMap;
/*
MODULE 3: Voters display (on the map)
==================================================
Every time a new list is loaded, or when the filter(s) are changed
voters need to be updated both on the map and in the list
This script deals with the map
1. Create geo features from data coming from MODULE 1: LIST-LOADER
   or MODULE 2: LIST FILTERS
   The created features are ONE MARKER PER ADDRESS
2. Put the geo features on the map, and prepare them with event listeners
   The event listeners are to prepare for MODULE 4: VOTER SELECTION
*/

import { onSelectAction } from "./selected-voter.js";

/*
INITIALIZE BASE MAP TO SHOW
*/

const mapboxAccount = 'mapbox';
const mapboxStyle = 'light-v10';
const mapboxToken = `pk.eyJ1IjoibGktamllLWZqIiwiYSI6ImNsYWU2dWtqbzByZHYzb3F5dndrZm9vbXoifQ.RhKDjT-7I5oWlzeDbfrI9g`;

let baseMapEl = document.querySelector("#map-component");
export let baseMap = L.map(baseMapEl, { zoomControl: false }).setView([40, -75.15], 11);
L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 20,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
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
              "address": thisData[i]["short_address"],
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

// When showing on the map, we show only one marker per short_address
// This function slices the data to only one voter per short_address
function sliceByKey(data, key) {
  let dataUniqueAddress = data.reduce((result, thisItem) => {
    let thisCategory = thisItem[key];
    // Add item if its key is not added yet
    if(result.find(item => item[key] === thisCategory) == undefined) {
        result.push(thisItem);
    } else {
      // empty
    }
    return result;
  }, []);

  return dataUniqueAddress;
}

function showVotersOnMap(thisData) {
  let dataUniqueAddress = sliceByKey(thisData, "short_address");
  let voterFeatures = makeVoterFeatureCollection(dataUniqueAddress);
  if(baseMap.voterLayers !== undefined) {
    baseMap.removeLayer(baseMap.voterLayers);
  }
  baseMap.voterLayers = L.geoJSON(voterFeatures, {
    pointToLayer: (point, latLng) => L.circleMarker(latLng),
    style: {
      radius: 7,
      color: "#999999",
      stroke: true,
      opacity: 0.5,
      weight: 2,
    },
  })
  .on("click", voterMarkerOnClick)
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
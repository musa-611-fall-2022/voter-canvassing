/*
Hide and Show List Loader
*/

import { showVotersOnMap } from "./map.js";
import { baseMap } from "./map.js";
import { showVotersInList }  from './voter-list.js';

let hideButton = document.querySelector("#list-loader-hide");
let hidableChunk = document.querySelector("#list-loader-hidable-chunk");

// A variable to store whether the list loader component is currently hidden
let loaderElIsHidden = 0;

hideButton.addEventListener("click", ( ) => {
  if(loaderElIsHidden == 0) {
    hidableChunk.style.transform = "translateX(-16em)";
    hideButton.innerHTML = `
    <span class="material-symbols-outlined">chevron_right</span>
    `;
    loaderElIsHidden = 1;
  } else {
    hidableChunk.style.transform = "translateX(0em)";
    hideButton.innerHTML = `
    <span class="material-symbols-outlined">chevron_left</span>
    `;
    loaderElIsHidden = 0;
  }
});


/*
Load List
*/

let loadButtonEl = document.querySelector("#list-loader-load");
let toolTipEl = document.querySelector("#list-loader-load").querySelector(".tooltiptext");

// Function to change button tooltip depending on input
function errorTooltip(inputNumber) {
  let interruptLoad = false;
  if(inputNumber.length == 0) {
    toolTipEl.innerHTML = `<div class="tooltip-content">Empty input</div>`;
    console.log(toolTipEl);
    interruptLoad = true;
  } else if(inputNumber.length != 4) {
    toolTipEl.innerHTML = `<div class="tooltip-content">Wrong digits</div>`;
    interruptLoad = true;
  }
  return interruptLoad;
}

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
function makeVoterFeatureCollection(data) {

  // Construct a geojson empty frame
  const voters = {
    type: "FeatureCollection",
    features: [],
  };

  // Write into geojson
  for(let i = 0; i < data.length; i++) {
    let thisLngLat = data[i]["TIGER/Line Lng/Lat"];
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
              "id": data[i]["ID Number"],
              "last_name": data[i]["Last Name"],
              "first_name": data[i]["First Name"],
              "address": data[i]["TIGER/Line Matched Address"],
          },
        });
      }
    }
  }

  console.log(voters);
  return voters;
}

// Function to check if fetch is successful. If so, do fetch; if not, show on tooltip
function checkFetchStatus(resp) {
  if(resp.ok) {
    return resp.text();
  } else {
      // If the file doesn't exist, then show in tooltip
      toolTipEl.innerHTML = `<div class="tooltip-content">Wrong number</div>`;
      return;
  }
}

// Function: what happens after successful fetch
function loadVoterData(text) {
  const data = Papa.parse(text, { header: true }).data;

  // Make a FeatureCollection
  const voters = makeVoterFeatureCollection(data);

  // Show voters on the map
  showVotersOnMap(voters);
  baseMap.fitBounds(baseMap.voterLayers.getBounds());
  showVotersInList(data);
}

// Function on what happens when clicking on load button
function onLoadButtonClick() {
  // Get input list number
  let inputNumber = document.querySelector("#list-loader-input").value.replace(/\s/g, '');
  if(errorTooltip(inputNumber)) { return }

  let path = './data/voters_lists/' + inputNumber + '.csv';

  // Fetch the particular CSV file
  fetch(path)
  .then(checkFetchStatus)
  .then(loadVoterData);
}

// Add event listener to the load button
loadButtonEl.addEventListener("click", onLoadButtonClick);

// Refresh tooltip text when mouse moves out
loadButtonEl.addEventListener("mouseout", ( ) => {
  toolTipEl.innerHTML = `<div class="tooltip-content">Load List</div>`;
});



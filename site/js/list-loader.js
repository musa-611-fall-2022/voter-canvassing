import { showVotersOnMap } from "./map.js";
import { baseMap } from "./map.js";
import { showVotersInList }  from './voter-list.js';

/*
Hide and Show List Loader
*/

// DOM elements
let hideButtonEl = document.querySelector("#list-loader-hide");
let hidableChunkEl = document.querySelector("#list-loader-hidable-chunk");
let listNumberInputEl = document.querySelector("#list-loader-input");
let loadButtonEl = document.querySelector("#list-loader-load");
let toolTipEl = document.querySelector("#list-loader-load").querySelector(".tooltiptext");

// Create a global object to store current input number
let inputNumber;

// A variable to store whether the list loader component is currently hidden
let loaderElIsHidden = 0;

hideButtonEl.addEventListener("click", ( ) => {
  if(loaderElIsHidden == 0) {
    hidableChunkEl.style.transform = "translateX(-16em)";
    hideButtonEl.innerHTML = `
    <span class="material-symbols-outlined">chevron_right</span>
    `;
    loaderElIsHidden = 1;
  } else {
    hidableChunkEl.style.transform = "translateX(0em)";
    hideButtonEl.innerHTML = `
    <span class="material-symbols-outlined">chevron_left</span>
    `;
    loaderElIsHidden = 0;
  }
});

/*
Load List
*/

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

/* Function to check if fetch is successful.
If so, do fetch; if not, show on tooltip */
function checkFetchStatus(resp) {
  if(resp.ok) {
    return resp.text();
  } else {
      // If the file doesn't exist, then show in tooltip
      toolTipEl.innerHTML = `<div class="tooltip-content">Wrong number</div>`;
      return false;
  }
}

// This is a global object to store the current list of voters
export let data;

/* Function: what happens after successful fetch:
1. Make the data using Papaparse, and store it by updating the global variable "data"
2. When having the data, make a geometry object, which has voter IDs, using makeVoterFeatureCollection(data)
3. Show voters on the map
4. Show voters in the list
*/
function loadVoterData(text) {

  if(text == false) {
    return;
  }
  // Note skipEmptyLines: true; cleaning up the CSV
  /* notes with Mjumbe:
     Papa Parse is reading the last line of each csv as a person */
  data = Papa.parse(text, { header: true, skipEmptyLines: true }).data;

  // Make a FeatureCollection
  const voters = makeVoterFeatureCollection(data);

  // Show voters on the map
  showVotersOnMap(voters);
  baseMap.fitBounds(baseMap.voterLayers.getBounds());
  showVotersInList(data);

  window.data = data;
}

/* Function on what happens when clicking on load button
1. Make a path, and fetch
2. Check fetch status using checkFetchStatus
3. If check success, load data using loadVoterData; otherwise, show error tooltip
*/
function loadByListNumber(inputNumber) {
  let path = './data/voters_lists/' + inputNumber + '.csv';

  // Fetch the particular CSV file
  fetch(path)
  .then(checkFetchStatus)
  .then(loadVoterData);
  localStorage.setItem("current-list", inputNumber);
}

/* Function on what happens when clicking on load button
1. Read the list number
2. If the number is wrong (wrong digits, empty, etc.), go to errorTooltip
3. If the number is fine, go to loadByListNumber;
*/
function onLoadButtonClick() {
  // Get input list number
  inputNumber = listNumberInputEl.value.replace(/\s/g, '');
  if(errorTooltip(inputNumber)) { return }
  loadByListNumber(inputNumber);
}

/*
Automatically load list from local storage
*/

let autoList = localStorage.getItem("current-list" || "{}");
if(autoList.length == 4) {
  loadByListNumber(autoList);
}

// Add event listener to the load button
loadButtonEl.addEventListener("click", onLoadButtonClick);

// Refresh tooltip text when mouse moves out
loadButtonEl.addEventListener("mouseout", ( ) => {
  toolTipEl.innerHTML = `<div class="tooltip-content">Load List</div>`;
});

/*
Requirement:
There should be an input element on the page where you can enter a voter file number.
Save the input DOM element in a variable named voterFileInput attached to the global window object.
*/

window.voterFileInput = listNumberInputEl;

/*
Requirement:
There should be a button that will load the voter file number given in the voterFileInput when clicked. Save the button DOM element in a variable named voterFileLoadButton attached to the global window object.
*/

window.voterFileLoadButton = loadButtonEl;
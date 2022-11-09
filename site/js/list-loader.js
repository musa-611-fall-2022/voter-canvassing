/*
MODULE 1: LIST LOADER
==================================================
This script has the main functionalities of the list loader module
1. Load list on demand
2. Store loaded data in a global variable
3. Export data to be used in other scripts
*/

import { showVotersOnMap } from "./map.js";
import { fitMap } from "./map.js";
import { showVotersInList }  from './voter-list.js';

/*
Hide and Show List Loader
*/

// DOM elements
let listNumberInputEl = document.querySelector("#list-loader-input");
let loadButtonEl = document.querySelector("#list-loader-load");
let toolTipEl = document.querySelector("#list-loader-load").querySelector(".tooltiptext");

// Create a global object to store current input number
let inputNumber;

// This is a global object to store the current list of voters
export let data;
export let votersFeature;

/*
Load List
*/

// Function to change button tooltip depending on input
function errorTooltip(inputNumber) {
  let interruptLoad = false;
  if(inputNumber.length == 0) {
    toolTipEl.innerHTML = `<div class="tooltip-content">Empty input</div>`;
    interruptLoad = true;
  } else if(inputNumber.length != 4) {
    toolTipEl.innerHTML = `<div class="tooltip-content">Wrong digits</div>`;
    interruptLoad = true;
  }
  return interruptLoad;
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

// Function to add short address to each voter in data
function makeShortAddress(data) {
  for(let voter of data) {
    voter["short_address"] = `${voter["House Number"]} ${voter["Street Name"]}`;
  }
  return(data);
}

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
  data = {};
  data = Papa.parse(text, { header: true, skipEmptyLines: true }).data;

  // Create new property: combine house number with street name
  data = makeShortAddress(data);

  // Show voters on the map and list
  showVotersInList(data);
  showVotersOnMap(data);
  fitMap();

  // Store current list number to local storage to be loaded the next time
  localStorage.setItem("current-list", inputNumber);
  window.data = data;
}

/* Function on what happens when clicking on load button
1. Make a path, and fetch
2. Check fetch status using checkFetchStatus
3. If check success, load data using loadVoterData; otherwise, show error tooltip
*/
function loadByListNumber(inputNumber) {
  let path = './data/voters_lists/' + inputNumber + '.csv';

  // Set the input box placeholder
  listNumberInputEl.placeholder = `${inputNumber}`;

  // Fetch the particular CSV file
  fetch(path)
  .then(checkFetchStatus)
  .then(loadVoterData);
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

let autoList = localStorage.getItem("current-list") || "{}";
if(autoList == "{}" || autoList == undefined || autoList.length != 4) {
  autoList = "0101";
}

loadByListNumber(autoList);


// Add event listener to the load button
loadButtonEl.addEventListener("click", onLoadButtonClick);

// Simulate button click when press enter after input
listNumberInputEl.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    e.preventDefault();
    loadButtonEl.click();
  }
});

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
import { additionalData } from "./list-loader.js";
import { updateVoters, saveAdditionalInfo } from "./main.js";
import { data } from "./list-loader.js";
import { showVotersInList } from "./voter-list.js";
import { showVotersOnMap } from "./map.js";
import { fitMap } from "./map.js";
import { highlightVoter } from "./selected-voter.js";
import { allFilters } from "./list-filters.js";
import { inputNumber } from "./list-loader.js";

// Function to highlight an option given selectors
function highlightOption(groupIdSelector, optionIdSelector) {
  // First remove all highlighted classes
  let iconGroupEl  = document.querySelector(groupIdSelector).querySelectorAll(".icon-set");
  for(let item of iconGroupEl) {
    item.classList.remove("highlighted");
  }

  // DOM object of the icon to be highlighted
  let highlightIconSet = document.querySelector(groupIdSelector).querySelector(optionIdSelector);
  highlightIconSet.classList.add("highlighted");
}

// Function to add event listeners to option
// Everytime a click happens, store the clicked item in the container DOM
// .. until pushing the save button
function prepareOption(groupIdSelector) {
  let iconGroupEl = document.querySelector(groupIdSelector).querySelectorAll(".icon-set");
  // Add event listener
  for(let item of iconGroupEl) {
    item.addEventListener("click", ( ) => {

      // First, highlight that option
      highlightOption(groupIdSelector, `#${item.id}`);

      // Find substring item.id to get the real term
      let lastDashLocation = item.id.lastIndexOf("-");

      // Then, record the click
      document.querySelector(groupIdSelector).unsavedSelection = item.id.substring(lastDashLocation + 1);
    });
  }
}

// Save current canvass status on click
const canvassStatusSaveButtonEl = document.querySelector("#canvass-status-save");
canvassStatusSaveButtonEl.addEventListener("click", ( ) => {
  let unsavedSelection = document.querySelector("#icon-canvass").unsavedSelection;
  let currentVoterId = document.querySelector("#icon-canvass").currentVoterId;
  if(unsavedSelection) {
    // Initiate, if no additional info has been recorded for this voter
    if(!additionalData.info[currentVoterId]) {
      additionalData.info[currentVoterId] = {};
    }
    additionalData.info[currentVoterId]["canvass-status"] = unsavedSelection;

    // Then, update Data
    updateVoters(additionalData.info);

    // Then, update map and list
    // Remember to reapply the filters
    let filteredData = allFilters(data);
    showVotersInList(filteredData);
    showVotersOnMap(filteredData);
    fitMap();

    // After updating map, select this particular voter again
    console.log(currentVoterId);
    highlightVoter(currentVoterId);

    // Then, send the updated info to the cloud
    // and do a toast on success
    saveAdditionalInfo(inputNumber, additionalData.info);

    // Then, show a toast on the button
    canvassStatusSaveButtonEl.classList.add("canvass-status-save-toast");
    canvassStatusSaveButtonEl.innerHTML = "Updated status!";
    setTimeout(( ) => {
      canvassStatusSaveButtonEl.classList.remove("canvass-status-save-toast");
      canvassStatusSaveButtonEl.innerHTML = "Update status";
    }, 2000);
  }
});

export {
  highlightOption,
  prepareOption,
};
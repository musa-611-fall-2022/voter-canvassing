import { additionalData } from "./list-loader.js";
import { updateVoters, saveAdditionalInfo } from "./main.js";
import { data } from "./list-loader.js";
import { showVotersOnMap } from "./map.js";
import { highlightVoter } from "./selected-voter.js";
import { allFilters } from "./list-filters.js";
import { inputNumber } from "./list-loader.js";
import { showVotersInList } from "./voter-list.js";

// Function to highlight an option given selectors on click
function highlightOption(groupIdSelector, optionIdSelector) {
  // First remove all highlighted classes and reset everything to default gray color
  let iconGroupEl  = document.querySelector(groupIdSelector).querySelectorAll(".icon-set");
  for(let item of iconGroupEl) {
    item.classList.remove("highlighted");
    //item.classList.add("icon-no-color");
  }

  // DOM object of the icon to be highlighted
  if(document.querySelector(groupIdSelector).querySelector(optionIdSelector)) {
    let highlightIconSet = document.querySelector(groupIdSelector).querySelector(optionIdSelector);
    highlightIconSet.classList.add("highlighted");
  }
}

// Prepare the detailed info display for the selected voter
// 1. highlight options, 2. add event listeners
// Everytime a click happens, store the clicked item in the container DOM
// .. until pushing the save button
function prepareOption(groupIdSelector) {

  // DOM: all the icon sets in a particular group
  let iconGroupEl = document.querySelector(groupIdSelector).querySelectorAll(".icon-set");
  // Add event listener
  for(let item of iconGroupEl) {
    item.addEventListener("click", ( ) => {

      // First, highlight that option
      highlightOption(groupIdSelector, `#${item.id}`);

      // Find substring item.id to get the real term
      let lastDashLocation = item.id.lastIndexOf("-");

      // Then, record the click
      let storageEl = document.querySelector(groupIdSelector);
      storageEl.unsavedSelection = item.id.substring(lastDashLocation + 1);
    });
  }
}

// Likewise, also prepare the input box to be listened
function prepareInput(groupIdSelector) {
  let inputEl = document.querySelector(groupIdSelector).querySelector("input");
  inputEl.addEventListener("input", ( ) => {

    // When input, unhighlight all other options
    let iconGroupEl  = document.querySelector(groupIdSelector).querySelectorAll(".icon-set");
    for(let item of iconGroupEl) {
      item.classList.remove("highlighted");
      item.classList.add("icon-no-color");
    }

    // Record the input
    let customInput = inputEl.value;
    let storageEl = document.querySelector(groupIdSelector);
    storageEl.unsavedSelection = customInput;

  });
}

// After saving data, update Filtered data
// At the same time, update display on the map and in the list
function updateDataOnStatusSave(data, currentVoterId, status) {
  let filteredData = allFilters(data);
  // showVotersInList(filteredData);
  showVotersOnMap(filteredData);

  // Update the display of this particular voter
  let voterListItemsEl = document.querySelectorAll(".list-voter");
  // First find out which icon it should be
  let canvassStatusIcon = `<span class="material-symbols-outlined icon-gray-color">hourglass_top</span>`;
  if(status) {
    if(status === "completed") {
      canvassStatusIcon = `<span class="material-symbols-outlined icon-ok-color">task_alt</span>`;
    } else if(status === "awaits") {
      canvassStatusIcon = `<span class="material-symbols-outlined icon-notify-color">timeline</span>`;
    }
  }
  // Then find the corresponding DOM and update it
  for(let thisListItem of voterListItemsEl) {
    if(thisListItem.title == currentVoterId) {
      thisListItem.getElementsByTagName("div")[1].innerHTML = canvassStatusIcon;
    }
  }

  // Then rehighlight this voter
  highlightVoter(currentVoterId);
}

// Called on success of updating voter canvass status
function onUpdateStatusSuccess(canvassStatusSaveButtonEl) {
  canvassStatusSaveButtonEl.classList.add("canvass-status-save-toast");
  canvassStatusSaveButtonEl.innerHTML = "Updated status!";
  setTimeout(( ) => {
    canvassStatusSaveButtonEl.classList.remove("canvass-status-save-toast");
    canvassStatusSaveButtonEl.innerHTML = "Update status";
  }, 1500);
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
    updateDataOnStatusSave(data, currentVoterId, unsavedSelection);

    // Then, send the updated info to the cloud
    saveAdditionalInfo(inputNumber, additionalData.info);

    // Then, show a toast on the button
    onUpdateStatusSuccess(canvassStatusSaveButtonEl);
  }
});

// Initiate properties on DOM elements to store unsaved information
// Add names and such
let saveItemsSelectorsList = ["#icon-canvass", "#icon-lang", "#icon-plan", "#icon-mail", "#icon-who"];
let recordItemsList = ["canvass-status", "language", "plan", "mail"];

for(let i = 0; i < saveItemsSelectorsList.length; i++) {
  let selector = saveItemsSelectorsList[i];
  let name = recordItemsList[i];
  let itemEl = document.querySelector(selector);
  itemEl.recordItemName = name;
  itemEl.currentVoterId = undefined;
  itemEl.unsavedSelection = undefined;
}

// Save all on click
const finalSaveButtonEl = document.querySelector("#final-save");
finalSaveButtonEl.addEventListener("click", ( ) => {
  let currentVoterId;

  for(let selector of saveItemsSelectorsList) {
    let itemEl = document.querySelector(selector);
    let recordItemName = itemEl.recordItemName;
    currentVoterId = itemEl.currentVoterId;
    let unsavedSelection = itemEl.unsavedSelection;

    if(currentVoterId && unsavedSelection) {
      // Initiate, if no additional info has been recorded for this voter
      if(!additionalData.info[currentVoterId]) {
        additionalData.info[currentVoterId] = {};
      }
      // Add to temp save data
      additionalData.info[currentVoterId][recordItemName] = unsavedSelection;
    }
  }

  // Update data
  updateVoters(additionalData.info);
  // Then, send the updated info to the cloud
  saveAdditionalInfo(inputNumber, additionalData.info);

});

export {
  highlightOption,
  prepareOption,
  prepareInput,
};
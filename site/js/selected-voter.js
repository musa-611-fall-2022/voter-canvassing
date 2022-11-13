/*
MODULE 4: VOTER SELECTION
==================================================
1. Use global variable selectedVoter to store the currently voter selected.
   If no voter is selected at the moment, variable is undefined
2. Whenever a click on the voter list or on the map happens:
   2.1 Check if newly selected is the same as the current.
     2.1.1 If same, update selectedVoter to undefined -> use unhighlightVoter function
     2.1.2 If same, update selectedVoter. unhighlight current voter, highlight new voter
   2.2 Show this voter's information on the edit panels

Also does miscellaneous work, i.e., pan to voter on selection
*/

import { voterListItemsEl } from "./voter-list.js";
import { baseMap } from "./map.js";
import { showVotersOnMap } from "./map.js";
import { data } from "./list-loader.js";
import { filteredData } from "./list-filters.js";
import { voterListExpandButtonEl, voterListContainerEl, onExpandButtonClick } from "./list-expand.js";
import { bottomComponentEl } from "./hide-show.js";
import { displayInfo } from "./show-info.js";


/*
The unhighlight function is made of two parts:
unhighlight voter in the list, and unhighlight voter on the map
*/

// Initialize the variable to store which voter is currently selected
export let selectedVoter = undefined;

// Unhighlight all the voters
function unhighlightVoterInList() {
  for(const listItem of voterListItemsEl) {
    listItem.className = "list-voter";
  }
}

function unhighlightVoterOnMap() {
  // Re-run showVotersOnMap
  // Either use data or filteredData (if it's defined)
  if(filteredData !== undefined) {
    showVotersOnMap(filteredData);
  } else {
    showVotersOnMap(data);
  }
}

function unhighlightVoter() {
  unhighlightVoterInList();
  unhighlightVoterOnMap();
}

/*
The highlight function is made of two parts:
highlight voter in list, and highlight voter on map
*/

function highlightVoterInList(thisId) {
  // Initialize: remove all existing highlighted voters, if any
  unhighlightVoterInList();
  // Highlight selected voter
  let thisListItem = Array.from(voterListItemsEl).find(item => item.title == thisId);

  // Make this voter highlighted in color
  thisListItem.classList.add("selected");

  thisListItem.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function highlightVoterOnMap(thisId) {

  // First remove the existing highlight voter, if existing
  unhighlightVoterOnMap();

  // As the map doesn't have every voter's ID, we need to find the same address
  let thisAddress = data.find(item => item["ID Number"] === thisId).short_address;

  // Then find the marker to be highlighted
  // And then highlight it
  for(let entry of Object.entries(baseMap.voterLayers._layers)) {
    if(entry[1].feature.properties.address == thisAddress) {
      entry[1].setStyle({
        radius: 10,
        color: "#0d59a9",
        fillColor: "#0d59a9",
        stroke: true,
        opacity: 1,
        fillOpacity: 0.7,
        weight: 2,
      })
      .bringToFront();

      // Pan to the selected feature marker
      baseMap.panTo(entry[1]._latlng);
      break;
    }
  }
}

function highlightVoter(thisId) {
  highlightVoterInList(thisId);
  highlightVoterOnMap(thisId);
}

// Main. This function gets called whenever a "select" action is made
// i.e., clicking on a list item, or on a map marker

// Either highlight new voter and update selectedVoter, or unhighlight current voter
function onSelectAction(thisId) {

  // If clicking on the same voter, unhighlight them
  if(selectedVoter != undefined && thisId == selectedVoter) {
    unhighlightVoter();
    selectedVoter = undefined;
    // Show info edit panel
    bottomComponentEl.style.transform = "translateX(-30em)";

  } else {
    // If the list is currently expanded, unexpand it
    if(voterListExpandButtonEl.expandStatus == 1) {
      onExpandButtonClick(voterListExpandButtonEl, voterListContainerEl);
    }
    highlightVoter(thisId);
    // Update stored voter ID
    selectedVoter = thisId;

    // Show info edit panel (if not already)
    bottomComponentEl.style.transform = "translateX(0em)";

    // Display voter info
    displayInfo(thisId);
  }
}

export {
  onSelectAction,
};
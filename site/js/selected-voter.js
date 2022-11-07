/*
1. Use global variable selectedVoter to store the currently voter selected.
   If no voter is selected at the moment, variable is undefined
2. Whenever a click on the voter list or on the map happens:
   2.1 Check if newly selected is the same as the current.
     2.1.1 If same, update selectedVoter to undefined -> use unhighlightVoter function
     2.1.2 If same, update selectedVoter. unhighlight current voter, highlight new voter
*/

import { voterListItemsEl } from "./voter-list.js";
import { baseMap } from "./map.js";
import { showVotersOnMap } from "./map.js";
import { data } from "./list-loader.js";
import { filteredData } from "./list-filters.js";
import { voterMarkerOnClick } from "./map.js";

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
  // First remove the highlight layer
  // Then re-run showVotersOnMap
  // because previously when a voter was highlighted, its regular marker was removed

  if(baseMap.highlightLayer !== undefined) {
    baseMap.removeLayer(baseMap.highlightLayer);
  }

  // When rerun showVotersOnMap, either use data or filteredData (if it's defined)
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
  thisListItem.classList.add("list-selected");
}

function highlightVoterOnMap(thisId) {

  // First remove the existing highlight voter, if existing
  unhighlightVoterOnMap();

  let selectedFeature;

  // Then remove the regular marker of the selected voter
  for(let entry of Object.entries(baseMap.voterLayers._layers)) {
    if(entry[1].feature.properties.id == thisId) {
      selectedFeature = entry[1].feature;
      baseMap.removeLayer(entry[1]);
      break;
    }
  }

  // Then show this highlighted voter on the map
  baseMap.highlightLayer = L.geoJSON(selectedFeature, {
    pointToLayer: (point, latLng) => L.circleMarker(latLng),
    style: {
      radius: 10,
      color: "#0d59a9",
      fillColor: "#0d59a9",
      stroke: true,
      opacity: 1,
      fillOpacity: 0.7,
      weight: 2,
    },
  })
  .on("click", voterMarkerOnClick)
  .addTo(baseMap);

}

function highlightVoter(thisId) {
  highlightVoterInList(thisId);
  highlightVoterOnMap(thisId);
}

// Main. This function gets called whenever a "select" action is made
// i.e., clicking on a list item, or on a map marker

// Either highlight new voter and update selectedVoter, or unhighlight current voter
function onSelectAction(thisId) {

  if(selectedVoter != undefined && thisId == selectedVoter) {
    unhighlightVoter();
    selectedVoter = undefined;
  } else {
    highlightVoter(thisId);
    selectedVoter = thisId;
  }
}

export {
  onSelectAction,
};
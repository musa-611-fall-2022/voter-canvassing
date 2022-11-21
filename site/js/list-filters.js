/*
MODULE 2: LIST FILTERS (MAIN)
===================================================
This script contains the links to all the filters.
Every time a filter is applied, changed, or taken off,
we should calculate a new filtered data by applying all the filters.

Once all the filters are applied, update the voter list and voter map

Sequence:
eventlistener -> function: 1. apply all filters on by one, 2. update voter list and map
*/

import { data } from "./list-loader.js";
import { filterByNameAddress } from "./search-box.js";
import { showVotersInList } from "./voter-list.js";
import { showVotersOnMap } from "./map.js";
import { filterByOption, uncheckAllOptions, filterByVisitStatus } from "./other-filters.js";
import { changeFilterButtonColor } from "./filter-window.js";

//import { makeVoterFeatureCollection } from "./map.js";

// Initialize
export let filteredData = undefined;

// Store a global status: whether any filter is applied
export let filterApplied = {
  status: 0,
};

// All the filter elements
import { voterInputBoxEl } from "./search-box.js";
let partyFiltersEl = document.querySelectorAll('.party-checkbox');
let statusFiltersEl = document.querySelectorAll('.status-checkbox');
let visitFiltersEl = document.querySelectorAll('.visit-checkbox');

/*
A function that includes all the filters
*/

function allFilters() {
  filterApplied.status = 0;
  filteredData = data;
  filteredData = filterByNameAddress(filteredData);
  filteredData = filterByOption(filteredData, partyFiltersEl, "Party Code");
  filteredData = filterByOption(filteredData, statusFiltersEl, "Voter Status");
  filteredData = filterByVisitStatus(filteredData, visitFiltersEl);

  changeFilterButtonColor(filterApplied.status);
  return(filteredData);
}

function filterAllAndUpdate() {
  filteredData = allFilters();
  // Update display
  showVotersInList(filteredData);
  showVotersOnMap(filteredData);
}

// Search box filter
voterInputBoxEl.addEventListener("input", filterAllAndUpdate);

// The other filters

function prepareFilterSet(filtersEl) {
  for (const cb of filtersEl) {
    cb.addEventListener('change', ( ) => {
      if(cb.checked) { // Meaning user intends to check this one

        // First uncheck everything in the party group
        uncheckAllOptions(filtersEl);
        // Recheck self if it should be that way
        cb.checked = true;

      } else { // Meaning user intends to uncheck this one
        cb.checked = false;
      }
      // Go through all filters
      filterAllAndUpdate();
    });
  }
}

prepareFilterSet(partyFiltersEl);
prepareFilterSet(statusFiltersEl);
prepareFilterSet(visitFiltersEl);

export {
  filterAllAndUpdate,
  allFilters,
};
/*
MODULE 2: LIST FILTERS (COMPONENT)
==================================================
This script contains the functions to filter voters by the other filters
Refer to [list-filters.js] to see how all the filters work together
*/

import { filterApplied } from "./list-filters.js";

// Function to filter data by party
function filterByOption(data, filtersEl, voterProperty) {
  let filtered = data;
  for (const checkbox of filtersEl) {
    if (checkbox.checked) {
      filtered = filtered.filter((voter) => voter[voterProperty] === checkbox.value);

      // If anything is checked...
      filterApplied.status = 1;
    }
  }
  return filtered;
}

function filterByVisitStatus(data, filtersEl) {
  let filtered = data;
  for (const checkbox of filtersEl) {
    if (checkbox.checked) {
      filtered = filtered.filter((voter) => {
        let thisStatus;
        if(voter["canvass-status"]) {
          thisStatus = voter["canvass-status"];
        } else {
          thisStatus = "pending";
        }
        return thisStatus === checkbox.value;
      });
    }
  }
  return filtered;
}

// Function to uncheck all checkboxes in a group
function uncheckAllOptions(optionsEl) {
  for(const cb of optionsEl) {
    cb.checked = false;
  }
}

export {
  filterByOption,
  uncheckAllOptions,
  filterByVisitStatus,
};
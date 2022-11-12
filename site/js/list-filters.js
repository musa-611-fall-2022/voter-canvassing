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

//import { makeVoterFeatureCollection } from "./map.js";

// Initialize
export let filteredData = undefined;

/*
A function that includes all the filters
*/

function allFilters(data) {
  let filtered = data;
  filtered = filterByNameAddress(data);
  // More filters to come...

  return filtered;
}

/*
Search box filter
*/

import { voterInputBoxEl } from "./search-box.js";
voterInputBoxEl.addEventListener("input", ( ) => {
  filteredData = allFilters(data);
  showVotersInList(filteredData);
  showVotersOnMap(filteredData);
});

/*
Function for voter party
*/
 let partyFilter = document.querySelectorAll('.party-checkbox');

 function shouldShowParty () {
    let filteredParty = data;
    for (const checkbox of partyFilter) {
        if (checkbox.checked) {
          filteredParty = filteredParty.filter(function (voter) {
                const partyType = checkbox.value;
                if (voter['Party Code'] === partyType) {
                    return true;
                } else {
                    return false;
                }

            });
        }
    }

    return filteredParty;
}

for (const cb of partyFilter) {
  cb.addEventListener('change', () => {
      const filteredParty = shouldShowParty();
      showVotersOnMap(filteredParty);
      showVotersInList(filteredParty);
  });
}

/*
Function for voter status
*/
let statusFilter = document.querySelectorAll('.status-checkbox');

function shouldShowStatus () {
   let filteredStatus = data;
   for (const checkbox of statusFilter) {
       if (checkbox.checked) {
        filteredStatus = filteredStatus.filter(function (voter) {
               const statusType = checkbox.value;
               if (voter['Voter Status'] === statusType) {
                   return true;
               } else {
                   return false;
               }

           });
       }
   }

   return filteredStatus;
}

for (const cb of statusFilter) {
 cb.addEventListener('change', () => {
     const filteredStatus = shouldShowStatus();
     showVotersOnMap(filteredStatus);
     showVotersInList(filteredStatus);
 });
}


  const activeFilter = document.querySelector('#active');
  activeFilter.addEventListener("click", () => {
      filteredData = allFilters(data);
        // showVotersInList(filteredData);
        // showVotersOnMap(filteredData);
        console.log('hello');
  });

  const inactiveFilter = document.querySelector('#inactive');
  inactiveFilter.addEventListener("click", () => {
      filteredData = allFilters(data);
        // showVotersInList(filteredData);
        // showVotersOnMap(filteredData);
        console.log('hello');
  });


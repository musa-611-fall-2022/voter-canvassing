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
// import { filterByDemocrat } from "./search-box.js";
// import { democratList } from "./voter-list.js";
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

const democratFilter = document.querySelector('#democrat');
democratFilter.addEventListener("click", () => {
  filteredData = allFilters(data);
      showVotersInList(filteredData);
      showVotersOnMap(filteredData);
      // const democratic = filterByDemocrat();
      // // democratList(democratic);
      // // const child = document.getElementsByClassName("list-voter");
      console.log(filteredData);
  });

const republicanFilter = document.querySelector('#republican');
republicanFilter.addEventListener("click", () => {
    filteredData = allFilters(data);
      // showVotersInList(filteredData);
      // showVotersOnMap(filteredData);
      console.log('hello');
  });

  const noPartyFilter = document.querySelector('#no-party');
  noPartyFilter.addEventListener("click", () => {
      filteredData = allFilters(data);
        // showVotersInList(filteredData);
        // showVotersOnMap(filteredData);
        console.log('hello');
  });

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

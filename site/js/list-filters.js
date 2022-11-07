/*
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
export let filteredData;

/*
Search box filter
*/

import { voterInputBoxEl } from "./search-box.js";
voterInputBoxEl.addEventListener("input", ( ) => {
  filteredData = filterByNameAddress(data);
  showVotersInList(filteredData);
  showVotersOnMap(filteredData);
});
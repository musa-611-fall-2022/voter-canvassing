import { initializeMap, locateMe } from './map.js';
import { populateVoterList } from './dataPull.js';

let map = initializeMap();

let listNum = "0101";
populateVoterList(listNum, map);

locateMe(); // runs function to return your location and mark it on a map. Have to use localhost:8080 for the location to be accessed though.
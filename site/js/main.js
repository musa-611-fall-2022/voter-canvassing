import { initializeMap } from './map.js';
import { populateVoterList } from './dataPull.js';

let map = initializeMap();

let listNum = "0101";
populateVoterList(listNum, map);


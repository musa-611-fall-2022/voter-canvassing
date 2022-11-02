import { initializeMap } from './map.js';
import { getVoterList } from './dataPull.js';

let map = initializeMap();

let listNum = "0101";
let list = getVoterList(listNum);
console.log(list);


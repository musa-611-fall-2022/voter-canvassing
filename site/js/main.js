import { initializeMap, locateMe } from './map.js';
import { populateVoterList } from './dataPull.js';

let map = initializeMap();
let listNum = "0101";
 
let voterFileInput = document.querySelector('.input'); // saves input DOM element as variable
let voterFileLoadButton = document.querySelector('.button'); // saves button DOM element as variable 

function onButtonClicked(evt) {
    let listNum = voterFileInput.value;
}; // creates function that passes the value entered in input text box to the variable listNum - don't think I got this right

function loadVoterList() {
    voterFileLoadButton.addEventListener('click', onButtonClicked);
}; //adds an event listener that executes the onButtonClicked function when the voter load button is clicked 
loadVoterList();

populateVoterList(listNum, map);

locateMe(); // runs function to return your location and mark it on a map. Have to use localhost:8080 for the location to be accessed though.

//declares variables in Global Scope 
window.voterFileInput = voterFileInput;
window.voterFileLoadButton = voterFileLoadButton;
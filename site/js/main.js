import { initializeMap, locateMe } from './map.js';
import { populateVoterList } from './dataPull.js';

let map = initializeMap();
let listNum = "0101";
let myLocation; // made a global myLocation variable that can be accessed when looking for other point features in the vicinity

let voterFileInput = document.querySelector('.input'); // saves input DOM element as variable
//need to restrict line of input to just 1. currently accepts enter and can fit a paragraph.

let voterFileLoadButton = document.querySelector('.button'); // saves button DOM element as variable

let voterListObj = document.querySelector("#voter-list"); // get list we'll put voters in from DOM

function onButtonClicked(evt) { // maybe add functionality that listens for enter button pressed
    listNum = voterFileInput.value;
    console.log(listNum);
    populateVoterList(listNum, map, voterListObj, myLocation);
} // creates function that passes the value entered in input text box to the variable listNum.

function loadVoterList() {
    voterFileLoadButton.addEventListener('click', onButtonClicked);
} //adds an event listener that executes the onButtonClicked function when the voter load button is clicked
loadVoterList();

locateMe(map, myLocation); // runs function to return your location and mark it on a map. Have to use localhost:8080 for the location to be accessed though.

//declares variables in Global Scope
window.voterFileInput = voterFileInput;
window.voterFileLoadButton = voterFileLoadButton;
window.voterList = voterListObj;
window.voterMap = map;
window.myLocation = myLocation;
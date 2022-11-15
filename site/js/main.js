import { initializeMap } from './map.js';
import { populateVoterList } from './dataPull.js';

let map = initializeMap();
let listNum = "0101";
let myLocation; // made a global myLocation variable that can be accessed when looking for other point features in the vicinity

let voterFileInput = document.querySelector('.input'); // saves input DOM element as variable
//need to restrict line of input to just 1. currently accepts enter and can fit a paragraph.

let voterFileLoadButton = document.querySelector('#load-voter-list-button'); // saves load voter list button DOM element as variable

let voterListObj = document.querySelector("#voter-list"); // get list we'll put voters in from DOM

let clearInputTextButton = document.querySelector('#clear-text-button'); //saves clear input text button as a DOM

let clearMapButton = document.querySelector('#clear-map-button');

function onClearMapButtonClicked() {
    map.removeLayer(map.voterLayer);
    voterListObj.innerHTML = ``;
    console.log("Map cleared");
}

function clearMap() {
    clearMapButton.addEventListener('click', onClearMapButtonClicked);
}
clearMap();

function onButtonClicked() { // maybe add functionality that listens for enter button pressed
    listNum = voterFileInput.value;
    console.log(listNum);
    onClearMapButtonClicked();
    populateVoterList(listNum, map, voterListObj, myLocation);
} // creates function that passes the value entered in input text box to the variable listNum.

function loadVoterListClick() {
    voterFileLoadButton.addEventListener('click', onButtonClicked);
} //adds an event listener that executes the onButtonClicked function when the voter load button is clicked
loadVoterListClick();

function loadVoterListEnter() {
    voterFileInput.addEventListener('keypress', function(event) {
    if (event.keyCode == 13)
    voterFileLoadButton.click();
});
}

loadVoterListEnter();
 //adds an event listener that executes the onButtonClicked function when a user hits enter while typing in the Voter File Input text box

function onClearInputButtonClicked () {
    voterFileInput.value = '';
}

function clearInputTextBox () {
    clearInputTextButton.addEventListener('click', onClearInputButtonClicked);
}
clearInputTextBox();
//adds an event listener that clears the voter list input text box when the user clicks the Clear Input Text button



//locateMe(map, myLocation); // runs function to return your location and mark it on a map. Have to use localhost:8080 for the location to be accessed though.

//declares variables in Global Scope
window.voterFileInput = voterFileInput;
window.voterFileLoadButton = voterFileLoadButton;
window.voterListObj = voterListObj;
window.voterMap = map;
window.myLocation = myLocation;




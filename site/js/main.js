import { initMap, searchNeighbor, loadData , updateUserPositionOn} from "./map.js";
import { showVoterInList } from "./voter-list.js";
import {showvoterDataInForm,  initvoterInfoForm} from "./voter-info-form.js"
import { loadNotes, saveNotes } from './inventory.js';
import { initToast, showToast } from './toast.js';
const map = initMap();
 let app = {
    currentvoter: null,
    notes: null,
  }; 
let neighborInput = document.querySelector('#neighbor-name-input');
let searchOnClicked = document.querySelector('#neighbor-name-search');
searchNeighbor(map, searchOnClicked, neighborInput);

//function onInventoryLoadSuccess(data) {
  //map.VoterLayers.addData(data);
  //loadOverlayEl.classList.add('hidden');
//}


  
 //`onSaveClicked` will be called if and when the save button on the voter info form is clicked
function onSaveClicked(evt) {
    const note = evt.detail.note;
    const voterId = app.currentvoter.properties['id'];
    app.notes[voterId] = note;
  
    saveNotes(app.notes);
    showToast('Saved!', 'toast-success');
  
  }
  
  // `onvoterSelected` will be called if and when the user clicks on a voter on the map
function onvoterSelected(evt) {
    const voter = evt.detail.voter;
    app.currentvoter = voter;
  
    const voterId = voter.properties['id'];
    const notes = app.notes[voterId] || '';
    showvoterDataInForm(voter, notes);
  }

    function setupInteractionEvents() {
    window.addEventListener('voter-selected', onvoterSelected);
    window.addEventListener('save-clicked', onSaveClicked);
  } 

  //Geolocatoion Part
  function onUserPositionSuccess(pos) {
    updateUserPositionOn(map, pos);
  }
  function onUserPositionFailure(err) {
    console.log(err);
  }
  // Define global interface setup
// -----------------------------
// Most setup function belong in one component or another. However, there is
// always some setup that doesn't belong to any specific component of your
// application. Here we set up events that have cross-component implications,
// for which we have defined handlers above.

function setupGeolocationEvent() {
  navigator.geolocation.getCurrentPosition(
    onUserPositionSuccess,
    onUserPositionFailure,
  );
}



  initToast();
  initvoterInfoForm();
  setupGeolocationEvent();
   loadNotes(notes => {
    app.notes = notes;
    setupInteractionEvents();
  }); 
  //loadData(onInventoryLoadSuccess);

window.app=app;  
window.voterFileInput = neighborInput;
window.voterFileLoadButton = searchOnClicked;
window.voterMap = map; 
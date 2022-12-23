import { initMap, searchNeighbor, updateUserPositionOn} from "./map.js";
import {showvoterDataInForm,  initvoterInfoForm, getFormContent, getLanguageContent, getMailInPersonContent} from "./voter-info-form.js"
import { loadNotes, saveNotes, loadLanguage, loadMailOrInPerson } from './inventory.js';
import { initToast, showToast } from './toast.js';
const map = initMap();
 let app = {
    currentvoter: null,
    notes: null,
    language: null,
    mailOrInPerson: null,
  }; 
let neighborInput = document.querySelector('#neighbor-name-input');
let searchOnClicked = document.querySelector('#neighbor-name-search');
searchNeighbor(map, searchOnClicked, neighborInput);

function onNotesSaveSuccess() {
  showToast('Saved!', 'toast-success');
};
  
 //`onSaveClicked` will be called if and when the save button on the voter info form is clicked
function onSaveClicked() {
  const note = getFormContent();
  const language = getLanguageContent();
  const mailOrInPerson = getMailInPersonContent();
  const voterId = app.currentvoter['id'];

  saveNotes(voterId, note, language, mailOrInPerson, app, onNotesSaveSuccess);

};
  
  // `onvoterSelected` will be called if and when the user clicks on a voter on the map
function onvoterSelected(evt) {
  const voter = evt.detail.voter;
  app.currentvoter = voter;

  const voterId = voter['id'];
  const notes = app.notes[voterId] || 'add some notes...';
  const language = app.language[voterId] || 'Preferred Language?';
  const mailOrInPerson = app.mailOrInPerson[voterId] || 'Vote by mail or in person?';
  showvoterDataInForm(notes, language, mailOrInPerson);
};

function setupInteractionEvents() {
  window.addEventListener('voter-selected', onvoterSelected);
  window.addEventListener('save-clicked', onSaveClicked);
};

  //Geolocatoion Part
function onUserPositionSuccess(pos) {
  updateUserPositionOn(map, pos);
};

function onUserPositionFailure(err) {
  console.log(err);
};


function setupGeolocationEvent() {
  navigator.geolocation.getCurrentPosition(
    onUserPositionSuccess,
    onUserPositionFailure,
  );
};


initToast();
initvoterInfoForm();
setupInteractionEvents();
loadNotes(notes => {
  app.notes = notes;
}); 
loadLanguage(language => {
  app.language = language;
}); 
loadMailOrInPerson(mailOrInPerson => {
  app.mailOrInPerson = mailOrInPerson;
});
setupGeolocationEvent();
  
window.app=app;  
window.voterFileInput = neighborInput;
window.voterFileLoadButton = searchOnClicked;
window.voterMap = map; 
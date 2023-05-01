// Tree Inventory Surveying App
// ============================

// The _main.js_ module defines the primary functionality of the app, and serves
// as the cross-component coordinator. Additional functionality is found in
// individual component modules:
// * [map.js](map.html) for behavior related to the map
// * [tree-info-form.js](tree-info-form.html) for form behavior
// * [toast.js](toast.html) for the messages that get shown temporarily
// * [inventory.js](inventory.html) for functions governing the loading/saving
//   of tree inventory and notes

import { initMap, updateUserPositionOn } from './map.js';
import { voterListInput, saveVoterListClicked } from './voter-list.js';
import { initTreeInfoForm, showTreeDataInForm } from './tree-info-form.js';
import { initToast, showToast } from './toast.js';
import { downloadInventory, loadNotes, saveNotes } from './inventory.js';

// The state of the app is stored in a global `app` variable. The things that we
// keep track of in this app state are:
// 1.  The ID of the current tree that is selected, and
// 2.  An object that maps tree IDs to notes about that tree.
//
// We initialize the components of the state to `null` to signify that we
// haven't set them to anything yet.

let app = {
  currentTree: null,
  notes: null,
};

const loadOverlayEl = document.getElementById('load-overlay');
const map = initMap();

// Define event handlers
// ---------------------

// `onInventoryLoadSuccess` will be called if and when `downloadInventory`
// function completes the download of the tree inventory file successfully.
function onInventoryLoadSuccess(data) {
  //map.voterLayer.addData(data);
  loadOverlayEl.classList.add('hidden');
}

// triggered by save-button event (as defined in setUpInteractionEvents function), and passes the data saved in the details of save-event into local storage
function onSaveClicked(evt) {
  const note = evt.detail.note;
  const treeId = app.currentTree.properties['OBJECTID'];
  app.notes[treeId] = note;
  saveNotes(app.notes);
}

//const data = fetch('')
//.then(function(data) {return data});

initToast();
// try to load data

function makeVotersFeature(voter){
  return{
    'type': 'Feature',
    'properties': voter,
    'geometry': {
      "type": "Point",
      "coordinates": voter['TIGER/Line Lng/Lat'].split(','),
    },
  };
}

function fetchVoterList(voterListFilename) {
  fetch(`./data/voters_lists/${voterListFilename}.csv`)
    .then(resp => resp.text())
    .then(data => {
      const voters = Papa.parse(data, { header: true });
      window.data = data;
      for(let i = 0; i < voters.data.length; i++) {
        //if tigerline != empty, then run the following (to protect against empty attributes)
        if (voters.data[i]['TIGER/Line Lng/Lat'] !== undefined && voters.data[i]['TIGER/Line Lng/Lat'] !== ''){
        //console.log(voters.data[i]['TIGER/Line Lng/Lat']);
        const voterFeature = makeVotersFeature(voters.data[i]);
        console.log(voterFeature);
        map.voterLayer.addData(voterFeature);
        }
      }
      //console.log(voters);
      /*console.log(voters?.data?.length);
      console.log(!!voters?.data?.length);
      console.log(voters);
      if (voters?.data?.length) {
        showToast('Saved!', 'toast-success');
      } else {
        showToast('No!!!!', 'toast-failure');
      }*/
    });
  // .then(point => {
  //map.voterLayer.addData(point);
  //});
}


function onSaveVoteClicked(evt) {
  const listID = evt.detail.voterList;
  console.log(listID);
  fetchVoterList(listID);
  //showToast('Saved!', 'toast-success');
}

// takes the tree that is clicked on and making it currentTree
function onTreeSelected(evt) {
  const tree = evt.detail.tree;
  app.currentTree = tree;

  const treeId = tree.properties['OBJECTID'];
  const notes = app.notes[treeId] || '';
  showTreeDataInForm(tree, notes);
}

// **Geolocation** -- `onUserPositionSuccess` will be called by the geolocation
// API if and when the user's position is successfully found.
function onUserPositionSuccess(pos) {
  updateUserPositionOn(map, pos);
}

// **Geolocation** -- `onUserPositionSuccess` will be called by the geolocation
// API if and when there is an error in finding the user's position.
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

//creates events based on clicking a tree and clicking save button
function setupInteractionEvents() {
  window.addEventListener('tree-selected', onTreeSelected);
  window.addEventListener('save-clicked', onSaveClicked);
  window.addEventListener('save-vote-clicked', onSaveVoteClicked);
}

// Initialize the app components and events
// ----------------------------------------
//
// Set up the various components of the application, and any events that should
// be initialized. Note that setting up the interaction events is postponed
// until the notes are loaded from the remote data store, because we don't want
// our user to be able to load/save any data before we actually have the
// existing data loaded.

initTreeInfoForm();
setupGeolocationEvent();

voterListInput();
saveVoterListClicked();


loadNotes(notes => {
  app.notes = notes;
  setupInteractionEvents();
});
downloadInventory(onInventoryLoadSuccess);

window.app = app;



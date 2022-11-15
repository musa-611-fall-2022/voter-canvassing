/*
MAIN COORDINATION
This script is used for setting up cloud storage

This part is inspired by Mjumbe Poe
*/

// Import functions used to use Firestore cloud storage
// https://firebase.google.com/docs/web/setup#available-libraries for libraries to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
// My web app's Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDL11M21sMZ6wJ1SxFvEqEvQkipD7DFKjk",
  authDomain: "voter-canvassing.firebaseapp.com",
  projectId: "voter-canvassing",
  storageBucket: "voter-canvassing.appspot.com",
  messagingSenderId: "20100623977",
  appId: "1:20100623977:web:2d20af24c659bdda17bcf8",
  measurementId: "G-BXCLNBWQH6",
};

// Initialize firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);

/*
Save or Load List Number
*/

// LOAD LIST NUMBER FROM LAST TIME FROM CLOUD
// This function is called when starting the page and the local storage has no list number stored
// If success, load that list
// If not success, load list 0101
async function loadListNum(onSuccess, onFailure) {
  try {
    const notesDoc = doc(firestoreDb, "voter-canvassing", "current-list");
    const result = await getDoc(notesDoc);
    console.log("Loaded list number from Firestore!");
    onSuccess(result.data().inputNumber);
  } catch {
    if(onFailure) {
      onFailure("0101");
    }
  }
}

// SAVE CURRENT LIST NUMBER LOCALLY AND TO CLOUD
// This function is called whenever a voter list gets loaded [list-loader.js]
// Current list number automatically saved

import { additionalData } from "./list-loader.js";

async function saveListNum(inputNumber) {
  // Save locally
  localStorage.setItem("current-list", inputNumber);

  // Save to the cloud
  try {
    const notesDoc = doc(firestoreDb, "voter-canvassing", "current-list");
    await setDoc(notesDoc, { inputNumber });
    console.log("Saved current list number to cloud!");
  } catch(error) {
    console.log(error);
  }
}

/*
Save or Load Edited Voter Info
*/

import { fitMap } from "./map.js";
import { data } from "./list-loader.js";

// Update the data loaded from the csv with additional info
function updateVoters(additionalInfo) {
  for(let voter of data) {
    let thisId = voter["ID Number"];
    if(additionalInfo[thisId]) {
      let thisAdditionalInfo = additionalInfo[thisId];
      let keys = Object.keys(thisAdditionalInfo);
      for(let key of keys){
        voter[key] = thisAdditionalInfo[key];
      }
    }
  }
}

// Function called to get additional voter data from the cloud
// And then use the updated data to update the map and list
async function updateAdditionalInfo(listNumber, data, showOnMap, showInList) {
  try {
    const voterNotesDoc = doc(firestoreDb, "voter-info", listNumber);
    const result = await getDoc(voterNotesDoc);
    additionalData.info = result.data();
    updateVoters(result.data(), data);

  } catch {
    additionalData.info = {};
  }
  showOnMap(data);
  showInList(data);
  fitMap();
}

// Function to save the updated additional info to Firebase
async function saveAdditionalInfo(listNumber, additionalInfo) {
  try {
    const voterNotesDoc = doc(firestoreDb, "voter-info", listNumber);
    await setDoc(voterNotesDoc, additionalInfo);
    console.log("Saved edited info to the cloud!");
  } catch(error) {
    console.log(error);
  }
}

export {
  loadListNum,
  saveListNum,
  updateAdditionalInfo,
  updateVoters,
  saveAdditionalInfo,
};
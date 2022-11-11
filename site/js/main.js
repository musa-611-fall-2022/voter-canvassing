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
async function saveListNum(inputNumber) {
  // Save locally
  localStorage.setItem("current-list", inputNumber);

  // Save to the cloud
  try {
    const notesDoc = doc(firestoreDb, "voter-canvassing", "current-list");
    await setDoc(notesDoc, { inputNumber });
    console.log("Saved number to cloud");
  } catch(error) {
    console.log(error);
  }
}

export {
  loadListNum,
  saveListNum,
};
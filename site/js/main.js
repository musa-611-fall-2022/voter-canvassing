
import {initializevoteMap} from './vote-map.js';
let voteMap = initializevoteMap();
window.voteMap = voteMap;

import { additionalData } from "./loadfile.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

// import { initToast, showToast } from './toast.js';


let app = {
  currentVoter: null,
  notes: null,
}

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


const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);


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
    
  }

function onVoterSelected(evt){
  const voter = evt.layer.feature;
  app.currentVoter = voter;
  showVoterDataInForm(voter, app);

}




  export{
    updateAdditionalInfo,
    updateVoters,
  }


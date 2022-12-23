import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

// Config object gotten aaccording to https://support.google.com/firebase/answer/7015592
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

async function loadNotes(onSuccess, onFailure) {
    try {
      const notesDoc = doc(firestoreDb, "tree-inventory-notes", "notes");
      const result = await getDoc(notesDoc);
      const notes = result.data().notes;
      localStorage.setItem('notes', JSON.stringify(notes));
      onSuccess(notes);
    } catch {
      if (onFailure) {
        onFailure();
      }
    }
  }
  async function saveNotes(notes, onSuccess, onFailure) {
    // Save locally.
    localStorage.setItem('notes', JSON.stringify(notes));
  
    // Save in the cloud.
    try {
      const notesDoc = doc(firestoreDb, "tree-inventory-notes", "notes");
      await setDoc(notesDoc, { notes });
      console.log("Document written with ID: ", notesDoc.id);
      if (onSuccess) {
        onSuccess(notesDoc);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      if (onFailure) {
        onFailure(e);
      }
    }
  }
  
  export {
    loadNotes,
    saveNotes,
  };
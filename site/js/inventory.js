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
    // const notes = JSON.parse(localStorage.getItem('notes'));
    const notesDoc = doc(firestoreDb, "tree-inventory-notes", "notes");
    const result = await getDoc(notesDoc);
    const docData = result.data() || {};
    const notes = docData.content || {};
    onSuccess(notes);
  } catch {
    if (onFailure) {
      onFailure();
    }
  }
}

async function loadLanguage(onSuccess, onFailure) {
  try {
    // const notes = JSON.parse(localStorage.getItem('notes'));
    const notesDoc = doc(firestoreDb, "tree-inventory-notes", "notes");
    const result = await getDoc(notesDoc);
    const docData = result.data() || {};
    const language = docData.language || {};
    onSuccess(language);
  } catch {
    if (onFailure) {
      onFailure();
    }
  }
}

async function loadMailOrInPerson(onSuccess, onFailure) {
  try {
    // const notes = JSON.parse(localStorage.getItem('notes'));
    const notesDoc = doc(firestoreDb, "tree-inventory-notes", "notes");
    const result = await getDoc(notesDoc);
    const docData = result.data() || {};
    const mailOrInPerson = docData.mailOrInPerson || {};
    onSuccess(mailOrInPerson);
  } catch {
    if (onFailure) {
      onFailure();
    }
  }
}

async function saveNotes(voterId, note, language, mailOrInPerson, app, onSuccess, onFailure) {
  // Save in memory
  app.notes[voterId] = note;
  app.language[voterId] = language;
  app.mailOrInPerson[voterId] = mailOrInPerson;

  // Save in the cloud.
  try {
    const notesDoc = doc(firestoreDb, "tree-inventory-notes", "notes");
    await setDoc(notesDoc, { content: app.notes, language: app.language });
    if (onSuccess) {
      onSuccess(notesDoc);
    }
  } catch (e) {
    alert(`Shoot, I failed to save the notes in firestore. ${e}`);
    if (onFailure) {
      onFailure(e);
    }
  }
}


export {
  loadNotes,
  saveNotes,
  loadLanguage,
  loadMailOrInPerson
};
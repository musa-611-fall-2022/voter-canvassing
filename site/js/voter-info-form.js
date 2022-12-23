const voterNameEl = document.getElementById('First Name');
const voterNotesEl = document.getElementById('voter-notes');
const savevoterNotesEl = document.getElementById('save-voter-notes');

function showvoterDataInForm(voter, notes) {
  const voterName = voter.properties['First Name'];
  voterNameEl.innerHTML = voterName;
  voterNotesEl.value = notes;
}

function onSaveButtonClicked() {
  const note = voterNotesEl.value;
  const saveClickedEvent = new CustomEvent('save-clicked', { detail: { note } });
  window.dispatchEvent(saveClickedEvent);
}

function initvoterInfoForm() {
  savevoterNotesEl.addEventListener('click', onSaveButtonClicked);
}

export {
  showvoterDataInForm,
  initvoterInfoForm,
};
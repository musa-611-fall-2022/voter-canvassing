const voterNotesEl = document.getElementById('voter-notes');
const savevoterNotesEl = document.getElementById('save-voter-notes');

function showvoterDataInForm(notes) {
  voterNotesEl.value = notes;
}

function onSaveButtonClicked() {
  const note = voterNotesEl.value;
  const saveClickedEvent = new CustomEvent('save-clicked', { detail: { note } });
  window.dispatchEvent(saveClickedEvent);
}

function getFormContent() {
  const note = voterNotesEl.value;
  return note;
}

function initvoterInfoForm() {
  savevoterNotesEl.addEventListener('click', onSaveButtonClicked);
}

export {
  showvoterDataInForm,
  initvoterInfoForm,
  getFormContent,
};
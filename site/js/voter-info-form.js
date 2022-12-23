const voterNotesEl = document.getElementById('voter-notes');
const voterLanguageEl = document.getElementById('voter-language');
const voterMailInPersonEl = document.getElementById('mail&InPerson');
const savevoterNotesEl = document.getElementById('save-voter-notes');

function showvoterDataInForm(notes, language, mailOrInPerson) {
  voterNotesEl.value = notes;
  voterLanguageEl.value = language;
  voterMailInPersonEl.value = mailOrInPerson;
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

function getLanguageContent() {
  const language = voterLanguageEl.value;
  return language;
}

function getMailInPersonContent() {
  const mailInPerson = voterMailInPersonEl.value;
  return mailInPerson;
}

function initvoterInfoForm() {
  savevoterNotesEl.addEventListener('click', onSaveButtonClicked);
}

export {
  showvoterDataInForm,
  initvoterInfoForm,
  getFormContent,
  getLanguageContent,  
  getMailInPersonContent,
};
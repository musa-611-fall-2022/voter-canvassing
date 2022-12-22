const voterNameEl = document.querySelector('#Name');
const voterAddressEl = document.querySelector('#Address');
const VoterNoteEl = document.getElementById('people-notes');

function showVoterdata(voter, app){
    const Votername = voter['name'];
    const VoterAddress = voter['address'];
    const voterID = voter['id'];
    const note = app.notes[voterID] || '';
   // const VotingParty = voter['VotingParty'];
    //const languageAssistance = voter['languageAssistance']
    voterNameEl.innerHTML = Votername;
    voterAddressEl.innerHTML = VoterAddress;
    VoterNoteEl.value = note;
}

function getFormContent() {
    const note = VoterNoteEl.value;
    const name = voterNameEl.innerHTML;
    return note;

}

export{
    showVoterdata,
    getFormContent,
};
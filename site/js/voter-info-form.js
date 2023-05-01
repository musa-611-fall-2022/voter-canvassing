const voterNameEl = document.querySelector('#Name');
const voterAddressEl = document.querySelector('#Address');
const voterPartyEl = document.querySelector('#Voting-Party');
var VoterNoteEl = document.getElementById('.people-notes');

function showVoterdata(voter) {
    const Votername = voter['name'];
    const VoterAddress = voter['address'];
    const VoterParty = voter['VotingParty'];
    const voterID = voter['id'];
    //const note = app.notes[voterID] || '';
    // const VotingParty = voter['VotingParty'];
    //const languageAssistance = voter['languageAssistance']
    voterNameEl.innerHTML = Votername;
    voterAddressEl.innerHTML = VoterAddress;
    voterPartyEl.innerHTML = VoterParty;
}

function getFormContent() {
    const note = VoterNoteEl.value;
    const name = voterNameEl.innerHTML;
    return note;
}

export {
    showVoterdata,
    getFormContent,
};
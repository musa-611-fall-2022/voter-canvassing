const voterNameEl = document.querySelector('#Name');
const voterAddressEl = document.querySelector('#Address');
const voterPartyEl = document.querySelector('#Voting Party');

function showVoterdata(voter){
    const Votername = voter['name'];
    const VoterAddress = voter['address'];
    const VoterParty = voter['VotingParty'];
   // const VotingParty = voter['VotingParty'];
    //const languageAssistance = voter['languageAssistance']
    voterNameEl.innerHTML = Votername;
    voterAddressEl.innerHTML = VoterAddress;
    voterPartyEl.innerHTML = VoterParty;
}

export{
    showVoterdata,
};
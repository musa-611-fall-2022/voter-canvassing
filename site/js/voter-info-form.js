const voterNameEl = document.querySelector('#Name');
const voterAddressEl = document.querySelector('#Address');

function showVoterdata(voter){
    const Votername = voter['name'];
    const VoterAddress = voter['address'];
   // const VotingParty = voter['VotingParty'];
    //const languageAssistance = voter['languageAssistance']
    voterNameEl.innerHTML = Votername;
    voterAddressEl.innerHTML = VoterAddress;
}

export{
    showVoterdata,
};
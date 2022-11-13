const voterListFilter = document.querySelector('#voter-list-input');
const saveVoterListEl = document.getElementById('save-voter-list');

function voterListInput() {


    voterListFilter.addEventListener('input', () => {
        let voterList = voterListFilter.value;
        console.log('the text box contains: ' + voterList);
    });
}

function saveVoterList() {
    const voterList = voterListFilter.value;
    const saveClickedEvent = new CustomEvent('save-clicked', { detail: { voterList } });
    window.dispatchEvent(saveClickedEvent);
}

function saveVoterListClicked() {
    saveVoterListEl.addEventListener('click', saveVoterList);
}




export {
    voterListInput,
    saveVoterListClicked,
};

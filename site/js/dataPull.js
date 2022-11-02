function populateVoterList(listNum, map) {
    return fetch('data/voters_lists/' + listNum + '.csv')
    .then(resp => resp.text())
    .then(text => {
        const data = Papa.parse(text, { header: true });
        console.log(data['data']);
        populateVoterMap(data, map);
        populateVoterMenu(data);
    });
}

function populateVoterMap(data, map) {
    //pass
}

function populateVoterMenu(data) {
    //pass
}

export {
    populateVoterList,
};
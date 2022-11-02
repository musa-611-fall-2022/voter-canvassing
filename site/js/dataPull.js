function getVoterList(listNum) {
    return fetch('data/voters_lists/' + listNum + '.csv')
    .then(resp => resp.text())
    .then(text => {
        const data = Papa.parse(text, { header: true });
        console.log(data['data']);
        return data['data'];
    });
}

export {
    getVoterList,
};
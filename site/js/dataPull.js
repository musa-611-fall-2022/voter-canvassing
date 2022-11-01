function getVoterList(listNum) {
    fetch('data/voters_lists/' + listNum + '.csv')
    .then(resp => resp.text())
    .then(text => {
        const data = Papa.parse(text, { header: true });
        console.log(data);
    });
}

export {
    getVoterList,
};
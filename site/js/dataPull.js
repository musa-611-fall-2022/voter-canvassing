import { populateVoterMap } from './map.js';
import { populateVoterList } from './list.js';

function populateVoterList(listNum, map) {
    fetch('data/voters_lists/' + listNum + '.csv')
    .then(resp => resp.text())
    .then(text => {
        const data = Papa.parse(text, { header: true });
        console.log(data['data']);
        populateVoterMap(data, map);
        populateVoterMenu(data);
    });
}

export {
    populateVoterList,
};
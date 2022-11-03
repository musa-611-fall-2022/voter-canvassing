import { populateVoterMap } from './map.js';
import { populateVoterMenu } from './list.js';

function populateVoterList(listNum, map) {
    fetch('data/voters_lists/' + listNum + '.csv')
    .then(resp => resp.text())
    .then(text => {
        // TODO: try/catch HTTP error for nonexistent list number
        const data = Papa.parse(text, { header: true });
        console.log(data['data']);
        populateVoterMap(data['data'], map);
        populateVoterMenu(data['data']);
    });
}

export {
    populateVoterList,
};
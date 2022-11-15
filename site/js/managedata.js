import {  showVotersOnMap }  from './map.js';
//convert csv to json
function csvtojson ( map, votersToShow, onFailure){
    fetch(`./data/voters_lists/${votersToShow}.csv`)
    .then(response => {
        if (response.status === 200) {
        const data = response.text();
        return data;
        } else {
        alert('Oh no, I failed to download the data.');
        if (onFailure) { onFailure() }
        }
    })
    .then(v => Papa.parse(v, { delimiter:"," }))
    .catch(err => console.log(err))
    .then(result => {
        let v = result.data.slice(1, result.data.length-1);
        return v;

    })
        .then(result => showVotersOnMap( result, map));


    }

export{
    csvtojson,
};
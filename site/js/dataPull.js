import { initializeMap, locateMe, populateVoterMap } from './map.js';
import { populateVoterMenu } from './list.js';

const voterList = [];

function makeCoordinates(coords){

    //console.log(id);
    //console.log(parseFloat(coords.substring(19,36)));
    //console.log(parseFloat(coords.substring(0,18)));

    let x = 0, y = 0;

    try {

    if (isNaN(parseFloat(coords.substring(19, 36))) || parseFloat(coords.substring(19, 36)) === undefined ){
        x = 0;
        y = 0;
    } else {
        x = parseFloat(coords.substring(0, 18));
        y = parseFloat(coords.substring(19, 36));
    }

    }

    catch(e){
        console.log(e);
        //pass
    }

    return {
        latitude : x,
        longitude : y,
    };
}

function constructVoter(v) {
    let voterElement;
    try {
        voterElement = {
            name : v['First Name'].concat(" ", v['Middle Name'], " ", v['Last Name']),
            firstName : v['First Name'],
            middleName : v['Middle Name'],
            lastName : v['Last Name'],
            gender : v['Gender'],
            address : v['TIGER/Line Matched Address'],
            city : v['City'],
            county : v['County'],
            state : v['State'],
            zipCode : v['Zip'],
        };
        return voterElement;
    } catch(e) {
        voterElement = null;
        return voterElement;
    }
}

function makeVoterFeature(data){
    const voter = data;
    for (let v of voter){
        let addressIndex = voterList.findIndex(element => element.properties.address === v['TIGER/Line Matched Address']);
        if (addressIndex !== -1) {
            let voterObj = constructVoter(v);
            if (voterObj) {
                voterList[addressIndex].voters.push(voterObj);
            }
        } else {
            let geom = makeCoordinates(v['TIGER/Line Lng/Lat']);
            let addressElement = {
                type : "Feature",
                geometry : {
                    type : "Point",
                    coordinates : [geom.latitude, geom.longitude],
                },
                properties : {
                    address : v['TIGER/Line Matched Address'],
                },
            };
            let voterObj = constructVoter(v);
            if (voterObj) {
                addressElement['voters'] = [voterObj];
            }
            voterList.push(addressElement);
        }
    }
    return voterList;
}

function populateVoterList(listNum, map, voterListObj) {
    fetch('data/voters_lists/' + listNum + '.csv')
    .then(function (resp) {

        if(!resp.ok){
            alert("Invalid List Number.");
            }

        else{
            console.log("Working")
            return resp.text();
        }

    } ) // can we handle the error right here? // now handled invalid list number issue in this promise 
    .then(text => {
        // TODO: try/catch HTTP error for nonexistent list number // done.
        const data = Papa.parse(text, { header: true, skipEmptyLines: true });
        let voterList = makeVoterFeature(data['data']);
        populateVoterMap(voterList, map);
        populateVoterMenu(voterList, voterListObj);
    });
}

export {
    populateVoterList,
    makeVoterFeature,
};

window.voterList = voterList;

"-75.16145216099994,39.92993551500007"
"-75.15802336899998,39.93087322800005"
"-75.15842544799995,39.93086332400003"
"-75.15947777399998,39.93155817300004"

"112545002-51" // problem element in list '0101' // eliminated in the try-catch block in makeCoordinates
"015653961-51"
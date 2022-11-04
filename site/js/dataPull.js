import { initializeMap, populateVoterMap } from './map.js';
import { populateVoterMenu } from './list.js';

const voterList = [];

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

function makeVoterFeature(data){

    const voter = data;

    for (let v of voter){

        let geom = makeCoordinates(v['TIGER/Line Lng/Lat'], v['ID Number']);
        
        // element can definitely have more properties. Just kept these for the time-being

       try
       { let element = {
            type : "Feature",
            geometry : {
                type : "Point",
                coordinates : [geom.longitude, geom.latitude],
            },
            properties : {
                firstName : v['First Name'],
                middleName : v['Middle Name'],
                lastName : v['Last Name'],
                gender : v['Gender'],
                address : v['StrTIGER/Line Matched Addresseet Name'],
                city : v['City'],
                county : v['County'],
                state : v['State'],
                zipCode : v['Zip']
            }
        }
        
        voterList.push(element);}

        catch(e){
            continue;
        }       

    }

    return voterList;
}

function makeCoordinates(coords, id){

    //console.log(parseFloat(coords.substring(19,36)));
    //console.log(parseFloat(coords.substring(0,18)));

    //console.log(id);

    let x = 0, y = 0;
    try{
        x = parseFloat(coords.substring(0,18));
        y = parseFloat(coords.substring(19,36));}
        catch(e){
            
        }

    return {
        latitude : x,
        longitude : y,};
    
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
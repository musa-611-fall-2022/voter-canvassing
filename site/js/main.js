// Tree Inventory Surveying App
// ============================





//const map = initMap();
//nitMap();

import { loadNotes, saveNote } from './inventory.js';
import { initMap } from './map.js';
import { getFormContent, showVoterdata } from './voter-info-form.js';
//import { votersinlist } from './voterlist.js';

//let map = initMap();
//const voterData = downloadInventory();

//geoJSON(makeVoterfeature);
let map = initMap();

let app = {
    currentVoter: null,
    notes: {},
}
//voterstoshow(voters, map);
let listNum = "0101";

let voterFileInput = document.querySelector('.input');
let voterFileLoadButton = document.querySelector('#load-voter-list-button');
let voterList = document.querySelector("voter-list");
//votersinlist(voters);
let clearMapButton = document.querySelector('#clear-map-button');
let clearInputTextButton = document.querySelector('#clear-text-button');

//Functions


function onButtonClicked() {
    listNum = voterFileInput.value;
    console.log(listNum);
    //onClearMapButtonClicked();
    downloadInventory(makeVoterFeature);
}

function onClearMapButtonClicked() {
    map.removeLayer(map.voterLayer);
    voterList.innerHTML = ``;
}

function clearMap() {
    clearMapButton.addEventListener('click', onClearMapButtonClicked);
}
clearMap();

function onClearInputButtonClicked () {
    voterFileInput.value = '';
}

function clearInputTextBox () {
    clearInputTextButton.addEventListener('click', onClearInputButtonClicked);
}
clearInputTextBox();





function loadVoterListClick() {
    voterFileLoadButton.addEventListener('click', onButtonClicked);
} //Then call the function
loadVoterListClick();

function loadVoterListEnter() {
    voterFileInput.addEventListener('keypress', function(event) {
    if (event.keyCode == 13)
    voterFileLoadButton.click();
});
}// Then call the function
loadVoterListEnter();




async function downloadInventory(onSuccess, onFailure) {
    const resp = await fetch('data/voters_lists/' + listNum + '.csv');
    if (resp.status === 200) {
        const data = await resp.text();
        const data_json = Papa.parse(data, { header: true, skipEmptyLines: true }).data;
        //   console.log(data_json);
        //console.log(data_json[0]["TIGER/Line Lng/Lat"]);
        if (onSuccess) {onSuccess(data_json) }
    } else {
        alert('Oh no, I failed to download the data.');
        if (onFailure) { onFailure() }
    }
    makeVoterFeature(data_json);
    // return data_json;
    //votersinlist(data_json);
}



function onInventoryLoadSuccess(voters) {
    voterstoshow(voters);
    map.voterLayer.addData(voters);
    //votersinlist();
    //let voterList = document.querySelector("#voter-list");
    
}

/*
function onInventoryLoadSuccess(voters) {
    map.voterLayer.addData(voters);
}
*/





function makeVoterFeature(data_json) {
    const voters = {
        type: "FeatureCollection",
        features: [],
    };


    let i;
    console.log(data_json);
    console.log(data_json.length);
    for (i = 0; i < data_json.length; i++) {
        //console.log(i);
        let LatLng = data_json[i]["TIGER/Line Lng/Lat"];
        if (typeof (LatLng) == "string") {

            let Lng = Number(LatLng.split(",")[0]);
            let Lat = Number(LatLng.split(",")[1]);
            //let name[] = data_json[i]["First Name"];


            voters.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [Lng, Lat],
                },
                "properties": {
                    "name" : data_json[i]["First Name"].concat(" ", data_json[i]["Last Name"]),
                    "id": data_json[i]["ID Number"],
                    "last_name": data_json[i]["Last Name"],
                    "first_name": data_json[i]["First Name"],
                    "address": data_json[i]["TIGER/Line Matched Address"],
                    "VotingParty": "",
                    "languageAssistance": "",
                },
            });
        }
        console.log(voters);
    }
    onInventoryLoadSuccess(voters);
    //votersinlist();
}


function voterstoshow() {
    if (map.voterLayer !== undefined) {
      map.removeLayer(map.voterLayer);
    }

    map.voterLayer = L.geoJSON(null, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
            fillColor: '#ffffff',
            fillOpacity: 1,
            stroke: true,
            color: '#00008B',
            radius: 5,
            weight: 2.5
        },
    })
        .bindTooltip(layer => layer.feature.properties['name'])
        .addTo(map);
        

    setupinteractionevents();
    /*map.setView([data_json["features"][0]["geometry"]["coordinates"][1], data_json["features"][0]["geometry"]["coordinates"][0]], 16);*/
  }

/*
function onvoterSelected(evt) {
    const voter = evt.layer.feature;
    app.currentVoter = voter;
    showVoterdata(voter, app);
  }
*/


/*
function voterhighlight(voter){
    map.layer = L.geoJSON(null, {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
          fillColor: '#ff0000',
          fillOpacity: 0.6, 
          stroke: false,
        },
    }).addTo(map);
}
*/

const highlight = {
    fillColor: '#ff0000',
    fillOpacity: 0.6, 
    stroke: false,
};




const saveVoterNotesEl = document.getElementById('save-notes');




function onvoterSelected(evt) {
    let voterCard = document.createElement("div");
    const voterhighlight = evt.layer.feature;
    if(map.layer !== undefined){
        map.removeLayer(map.layer);
    }
    map.layer = L.geoJSON(voterhighlight, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, highlight);
        }
    }).addTo(map);


    //map.layer = L.circleMarker(voterhighlight).addTo(map);
    const voter = evt.layer.feature.properties;
    //voterhighlight(voterhighlight);
    app.currentVoter = voter;

    showVoterdata(voter, app);
  }


function onSaveClicked(){
    const content = getFormContent();
    const voterID = app.currentVoter['id'];
    saveNote(voterID, content, app);
}

function setupinteractionevents(){
    map.voterLayer.addEventListener('click',onvoterSelected);
    saveVoterNotesEl.addEventListener('click', onSaveClicked);
    //document.getElementById('click').style.color = "red";
}
//setupinteractionevents();

function onNotesLoadSucess(notes){
    app.notes = notes;
}

loadNotes(onNotesLoadSucess);





//  data = {};
//data = Papa.parse(text, { header: true, skipEmptyLines: true }).data;



//downloadInventory(makeVoterFeature);

//const data = downloadInventory(onInventoryLoadSuccess);
//makeVoterFeature(data);



window.map = map;
window.makeVoterFeature = makeVoterFeature;
//window.data_json = data_json;

window.app = app;
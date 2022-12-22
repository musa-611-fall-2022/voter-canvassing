// Tree Inventory Surveying App
// ============================





//const map = initMap();
//nitMap();

import { loadNotes, saveNote } from './inventory.js';
import { initMap } from './map.js';
import { getFormContent, showVoterdata } from './voter-info-form.js';
//import { votersinlist } from './voterlist.js';

let map = initMap();
let voterList; 
let data_json;

let app = {
    currentVoter: null,
    notes: {},
}

let listNum

let voterFileInput = document.querySelector('.input');
let voterFileLoadButton = document.querySelector('#load-voter-list-button');
let voterListObj = document.querySelector("#voter-list");
let clearMapButton = document.querySelector('#clear-map-button');
let clearInputTextButton = document.querySelector('#clear-text-button');



//Functions


// Click on button for markers and list to appear function
function onButtonClicked() {
    listNum = voterFileInput.value;
    downloadInventory(makeVoterFeature);
    voterMenuList(data_json, voterListObj);
}


// Click on button to clear map function
function onClearMapButtonClicked() {
    map.removeLayer(map.voterLayer);
    voterListObj.innerHTML = ``;
}

function clearMap() {
    clearMapButton.addEventListener('click', onClearMapButtonClicked);
}
clearMap();


// Click on button to clear input function
function onClearInputButtonClicked() {
    voterFileInput.value = '';
}

function clearInputTextBox() {
    clearInputTextButton.addEventListener('click', onClearInputButtonClicked);
}
clearInputTextBox();


// Click on button to load Voter List
function loadVoterListClick() {
    voterFileLoadButton.addEventListener('click', onButtonClicked);
}
loadVoterListClick();

function loadVoterListEnter() {
    voterFileInput.addEventListener('keypress', function (event) {
        if (event.keyCode == 13)
            voterFileLoadButton.click();
    });
}
loadVoterListEnter();


// Creating Voter List
/*function makeVoterList(data_json) {
    voterList = [];
    const voter = {
        type: "FeatureCollection",
        features: [],
    };
    let i;
    console.log(data_json);
    console.log(data_json.length);
    for (i = 0; i < data_json.length; i++) {
            voterList.features.push({
                "type": "Feature",
                "properties": {
                    "name" : data_json[i]["First Name"].concat(" ", data_json[i]["Last Name"]),
                    "address": data_json[i]["TIGER/Line Matched Address"],
                },
            });
        }
        console.log(voter);
    }
    onInventoryLoadSuccess(voter);
    return voterList;
    }*/

// Downloading data from /data/voters_lists and converting to json.
async function downloadInventory(onSuccess, onFailure) {
    const resp = await fetch('data/voters_lists/' + listNum + '.csv');
    if (resp.status === 200) {
        const data = await resp.text();
        data_json = Papa.parse(data, { header: true, skipEmptyLines: 'greedy' }).data;
        if (onSuccess) { onSuccess(data_json) }
        //console.log(data_json)
    } else {
        alert('Oh no, I failed to download the data.');
        if (onFailure) { onFailure() }
    }
};

//Function to show voter markers on map
function onInventoryLoadSuccess(voters) {
    voterstoshow(voters);
    map.voterLayer.addData(voters);
}

//Function to choose Philly coords
function coordsPhilly(lng, lat) {
    let result = false;
    if (typeof (lng) == "number" && typeof (lat) == "number") {
        if (lng < -73 && lng > -77 && lat < 41 && lat > 38) {
            result = true;
        }
    }
    return result;
}

//Function to create voter properties
function makeVoterFeature(data_json) {
    const voters = {
        type: "FeatureCollection",
        features: [],
    };


    let i;
    //console.log(data_json);
    //console.log(data_json.length);
    for (i = 0; i < data_json.length; i++) {
        let LatLng = data_json[i]["TIGER/Line Lng/Lat"];
        if (typeof (LatLng) == "string") {

            let Lng = Number(LatLng.split(",")[0]);
            let Lat = Number(LatLng.split(",")[1]);

            if (coordsPhilly(Lng, Lat)) {
                voters.features.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [Lng, Lat],
                    },
                    "properties": {
                        "name": data_json[i]["First Name"].concat(" ", data_json[i]["Last Name"]),
                        "id": data_json[i]["ID Number"],
                        "last_name": data_json[i]["Last Name"],
                        "first_name": data_json[i]["First Name"],
                        "address": data_json[i]["TIGER/Line Matched Address"],
                        "VotingParty": data_json[i]["Party Code"],
                        "Status": data_json[i]["Voter Status"],
                        "languageAssistance": "",
                    },

                });
            }
        }
        //console.log(voters);
    }
    onInventoryLoadSuccess(voters);
}


//Function to create voter markers
function voterstoshow(data_json) {
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

//Function to show voter data on markers
function onvoterSelected(evt) {
    const voterMarker = evt.layer.feature.properties;
    app.currentVoter = voterMarker;
    showVoterdata(voterMarker, app);
}

function setupinteractionevents() {
    map.voterLayer.addEventListener('click', onvoterSelected);
}

setupinteractionevents();

function onNotesLoadSucess(notes){
    app.notes = notes;
}

loadNotes(onNotesLoadSucess);



//Making everything globally available
window.map = map;
window.app = app;
window.voterFileInput = voterFileInput;
window.voterFileLoadButton = voterFileLoadButton;
window.voterListObj = voterListObj;
window.voterList = voterList;


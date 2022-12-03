import { initMap } from './map.js';

let map = initMap();
let listNum = [];

let voterFileInput = document.querySelector('.input');
let voterFileLoadButton = document.querySelector('#load-voter-list-button'); 
let voterListObj = document.querySelector("#voter-list"); 

let clearMapButton = document.querySelector('#clear-map-button');
let clearInputTextButton = document.querySelector('#clear-text-button'); 

//Functions

function onClearMapButtonClicked() {
    map.removeLayer(map.voterLayer);
    voterListObj.innerHTML = ``;
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


function onButtonClicked() { 
    listNum = String(voterFileInput.value);
    console.log(listNum);
    downloadInventory(makeVoterFeature);
}

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
        console.log(data_json);
        window.dat = data_json;
        //console.log(data_json[0]["TIGER/Line Lng/Lat"]);
        if (onSuccess) { onSuccess(data_json) }
    } else {
        alert('Enter Voter List Number to Start');
        if (onFailure) { onFailure() }
    }
    //return data_json;
};

function makeVoterFeature(data_json) {
    const voters = {
        type: "FeatureCollection",
        features: [],
    };

    let i;
    console.log(data_json)
    console.log(data_json.length);
    for (i = 0; i < data_json.length; i++) {
        //console.log(i);
        let LatLng = data_json[i]["TIGER/Line Lng/Lat"];
        if (typeof (LatLng) == "string") {

            let Lng = Number(LatLng.split(",")[0]);
            let Lat = Number(LatLng.split(",")[1]);


            voters.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [Lng, Lat],
                },
                "properties": {
                    "party": data_json[i]["Party Code"],
                    "last_name": data_json[i]["Last Name"],
                    "first_name": data_json[i]["First Name"],
                    "add": data_json[i]["TIGER/Line Matched Address"],

                },
            });

        }
    }
    onInventoryLoadSuccess(voters);
    console.log(voters);
};


function onInventoryLoadSuccess(voters) {
    map.voterLayer.addData(voters);
};

function updateUserPositionOn(map, pos) {
    map.positionLayer.addData({
      'type': 'Point',
      'coordinates': [pos.coords.longitude, pos.coords.latitude],
    });
    map.setView([pos.coords.latitude, pos.coords.longitude], 19);
  }

  function onUserPositionSuccess(pos) {
    updateUserPositionOn(map, pos);
  }

  function onUserPositionFailure(err) {
    alert(`Oh man, we just failed to find the user's position: ${err}`);
  }

  function setupGeolocationEvent() {
    navigator.geolocation.getCurrentPosition(
      onUserPositionSuccess,
      onUserPositionFailure,
    );
  }

  function setupInteractionEvents() {
    map.voterLayer.addEventListener('click', onTreeSelected);
  }


//  data = {};
//data = Papa.parse(text, { header: true, skipEmptyLines: true }).data;

downloadInventory(makeVoterFeature)

setupInteractionEvents();
setupGeolocationEvent();


//const data = downloadInventory(onInventoryLoadSuccess);
//makeVoterFeature(data);
window.voterMap = map;
window.voterFileInput = voterFileInput;
window.voterFileLoadButton = voterFileLoadButton;
window.voterListObj = voterListObj;
window.voterMap = map;


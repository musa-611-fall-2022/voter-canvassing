//set initial map using leaflet
import { showVoterInList } from './voter-list.js'
import {showvoterDataInForm, initvoterInfoForm} from './voter-info-form.js'
import { loadNotes, saveNotes } from './inventory.js';
import { initToast, showToast } from './toast.js';

/*
let app = {
  currentvoter: null,
  notes: null,
};*/
function onvoterClicked(evt) {
  console.log(evt);
  const voter = evt.layer.feature;

  const voterSelectedEvent = new CustomEvent('voter-selected', { detail: { voter } });
  window.dispatchEvent(voterSelectedEvent);
}

function initMap() {
    const map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoibWp1bWJlLXRlc3QiLCJhIjoiY2w3ZTh1NTIxMTgxNTQwcGhmODU2NW5kaSJ9.pBPd19nWO-Gt-vTf1pOHBA';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    map.treeLayer = L.geoJSON(null, {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng),
      style: {
        fillColor: '#83bf15',
        fillOpacity: 0.3,
        stroke: false,
      },
    }).addTo(map);
    
    //no use; never called
    map.treeLayer.addEventListener('click', onvoterClicked);

    map.positionLayer = L.geoJSON(null).addTo(map);

    return map;
  }
  

//turn array into feature
function makeVoterFeature(voter) {
    return {
      "type": "Feature",
      "id": voter['0'],
      "properties": {
        'First_Name': voter['3'],
        'Last_Name':voter['2'],
      },
      "geometry": {
        "type": "Point",
        "coordinates": [voter['28'].substr(0, 18), voter['28'].substr(19, voter.length)],
      },
    };
  }

//show feature on map
  function showVotersOnMap(map, VotersToShow) {
  if (map.VoterLayers !== undefined) {
    map.removeLayer(map.VoterLayers);
  }

  const VoterFeatureCollection = {
    "type": "FeatureCollection",
    "features": VotersToShow.map(makeVoterFeature),
  };

  map.VoterLayers = L.geoJSON(VoterFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
      stroke: null,
      fillOpacity: 0.9,
      radius: 3,
    },
  })
  .addTo(map);
  map.VoterLayers.addEventListener('click', onvoterClicked);
  }

  /*
//`onSaveClicked` will be called if and when the save button on the voter info form is clicked
function onSaveClicked(evt) {
  const note = evt.detail.note;
  const voterId = app.currentvoter.properties['id'];
  app.notes[voterId] = note;

  saveNotes(app.notes);
  showToast('Saved!', 'toast-success');

}

// `onvoterSelected` will be called if and when the user clicks on a voter on the map
function onvoterSelected(evt) {
  const voter = evt.detail.voter;
  app.currentvoter = voter;

  const voterId = voter.properties['id'];
  const notes = app.notes[voterId] || '';
  showvoterDataInForm(voter, notes);
}

  function setupInteractionEvents() {
  window.addEventListener('voter-selected', onvoterSelected);
  window.addEventListener('save-clicked', onSaveClicked);
}
*/
//turn csv to array
function loadData (map, neighbor, onFailure){
let voter_list = document.querySelector("#voterList");

fetch(`./voters_lists/${neighbor}.csv`)
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
  .then(result => {
    showVotersOnMap(map, result);
    return result;})
  .then(result =>{
    showVoterInList (result, voter_list);
  })
  
  
  
  
}

//reset position to input neighbor
function posMap (map, neighbor){
  fetch(`./voters_lists/${neighbor}.csv`)
    .then(response => {
        const data = response.text();
        return data;
    })
    .then(v => Papa.parse(v, { delimiter:"," }))
    .catch(err => console.log(err))
    .then(result => {
      map.positionLayer.addData({
        'type': 'Point',
        'coordinates': [ result.data['20']['28'].substr(19, result.data['20']['28'].length), result.data['20']['28'].substr(0, 18)],
      });
      map.setView([ result.data['20']['28'].substr(19, result.data['20']['28'].length), result.data['20']['28'].substr(0, 18)], 16);
      ;
  });
  }
  
//search targetted neighborhood
function searchNeighbor(map, searchOnClicked, neighborInput) {
searchOnClicked.addEventListener('click', () => {
  let neighbor = neighborInput.value;
  loadData(map, neighbor);
  posMap(map, neighbor);
});
document.getElementById('neighbor-name-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
  let neighbor = neighborInput.value;
  loadData(map, neighbor);
  posMap(map, neighbor);
  }
});
}

function updateUserPositionOn(map, pos) {
  map.positionLayer.addData({
    'type': 'Point',
    'coordinates': [pos.coords.longitude, pos.coords.latitude],
  });
  map.setView([pos.coords.latitude, pos.coords.longitude], 19);
}

loadNotes(notes => {
  app.notes = notes;
  setupInteractionEvents();
});


export {
    initMap,
    searchNeighbor,
    loadData,
    updateUserPositionOn,

};
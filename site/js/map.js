import { makeVoterFeature } from './dataPull.js';
import { populateVoterMenu } from './list.js';

const responseContainer = document.getElementById("response-container");
responseContainer.style.display = "none";

let address = "";

let people = document.createElement("ul");
let voterAddress = document.createElement("h3");

let closeVoterInfoButton = document.createElement("button");

let openVoterNotesButton = document.createElement("button");

let voterNotes = document.createElement("div");
voterNotes.id = "voter-notes"

let saveVoterNotesButton = document.createElement("button");

let closeVoterNotesButton = document.createElement("button");

let loadNotes = document.createElement("p");
loadNotes.style.height = "50px";
loadNotes.style.border = "10px black";
loadNotes.innerHTML = "No notes for the residents of this building so far..."

let writeNotes = document.createElement("textarea");
writeNotes.style.height = "100px";
writeNotes.style.width = "250px";

let clearMapButton = document.querySelector('#clear-map-button') 

//default-icon


const residence = {
    currentResidence: null,
    notes: null,
  };

function initializeMap () {
    let map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13); // made map global so that other functions can addTo 'map'
    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoibW9yZ2FuZ3IiLCJhIjoiY2w4dzF2bHZsMDJqdDN3czJwOGg0ZXBsbSJ9.tXRhvJAL-t7cJCrCyAEhUw';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 19,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    // layer for user location
    map.positionLayer = L.geoJSON(null).addTo(map);
    // layer for voter locations
    map.voterLayer = L.geoJSON(null).addTo(map);

    return map;
}

function locateMe(map){

    const successCallback = (pos) => {
        if (map.positionLayer !== undefined) {
            map.removeLayer(map.positionLayer);
        }

        myLocation = {
            'type': 'Point',
            'coordinates': [pos.coords.longitude, pos.coords.latitude]
        };

        map.positionLayer = L.geoJSON(myLocation).addTo(map);

        // un-comment following line if we want the map to zoom to user location on startup: 
        //map.setView([pos.coords.latitude, pos.coords.longitude], 19);

        return myLocation;

    }
    const errorCallback = (e) => console.log(e);

    const options = { enableHighAccuracy: true, timeout: 10000 };

    const id = navigator.geolocation.watchPosition(successCallback, errorCallback, options);

    //navigator.geolocation.clearWatch(id); // will need this when we change location in real-time.

}

function populateVoterMap(people, map) { // receives data from makeVoterFeature and plots them on the map

    console.log("These are the voters");

    // if (map.voterLayer !== undefined) {
    //     map.removeLayer(map.voterLayer);
    map.voterLayer = L.geoJSON(people, {pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
            fillColor: "orange",
            stroke: null,
            fillOpacity: 0.9,
            radius: 7,
            
        },
        onEachFeature : onEachFeature,
     }).addTo(map);

     function onClearMapButtonClicked () {
        map.removeLayer(map.voterLayer);
        console.log ("Map cleared")
      }
      
      function clearMap() {
          clearMapButton.addEventListener('click', onClearMapButtonClicked)
      }
      clearMap() 
         //map.flyTo(map.voterLayer, 16);
    // }

    // for( let ppl of people ){
    //     try{
    //     //L.marker(ppl.geometry.coordinates).bindPopup(ppl.properties['address']).addTo(map);
    //     // TODO: figure out how to get geoJSONs to work in new layer
    //     // map.voterLayer.addData(ppl);
    //     }
    //     catch(e){
    //         // pass
    //     }
    // }

}

function onEachFeature(feature, layer) {

    layer.on('click', function (e) {
        //console.log(feature.geometry)
        //L.marker(feature.geometry.coordinates).addTo(map);

        //residence.currentResidence = feature.properties.address;
        //residence.notes = localStorage.getItem(residence.currentResidence);
        console.log(localStorage.getItem(address));

        residence.currentResidence = feature.properties.address;
        residence.notes = localStorage.getItem(residence.currentResidence);
        voterNotes.style.display = "none";

        //alert(feature.properties.address);
        responseContainer.style.display = "flex";
        people.innerHTML = "";
        voterAddress.innerHTML = feature.properties.address;
        responseContainer.appendChild(voterAddress);
        let residents = feature.voters;

        for( let r = 0; r < residents.length; r++ ){
            console.log(residents[r].name)
            let person = document.createElement("li");
            
            person.innerHTML = residents[r].name;

            people.appendChild(person);
        }

        responseContainer.appendChild(people);

        closeVoterInfoButton.textContent = "Close";
        responseContainer.appendChild(closeVoterInfoButton);

        openVoterNotesButton.textContent = "Open Voter Notes";
        openVoterNotesButton.style.display = "block";
        responseContainer.appendChild(openVoterNotesButton);

        console.log(residents)
        
    });
}

closeVoterInfoButton.addEventListener('click',() =>{
    responseContainer.style.display = "none";
})



openVoterNotesButton.addEventListener('click', () =>{

    openVoterNotesButton.style.display = "none";

    voterNotes.style.zIndex = "2";
    voterNotes.style.display = "flex";
    voterNotes.style.alignContent = "column";

    address = residence.currentResidence;

    console.log(residence.notes);

    if(localStorage.getItem(address) === null){
        loadNotes.innerText = "No notes for this building so far..."
    }

    else{
        loadNotes.innerText = localStorage.getItem(address);
    }

    voterNotes.appendChild(loadNotes);
    voterNotes.appendChild(writeNotes);

    saveVoterNotesButton.textContent = "Save Voter Notes";
    voterNotes.appendChild(saveVoterNotesButton);

    closeVoterNotesButton.textContent = "Close Voter Notes";
    voterNotes.appendChild(closeVoterNotesButton);

    responseContainer.appendChild(voterNotes);

    closeVoterNotesButton.addEventListener('click', ()=>{
        voterNotes.innerHTML = " ";
        openVoterNotesButton.style.display = "flex";
    });

    saveVoterNotesButton.addEventListener('click', (e) =>{
        const notes = writeNotes.value;
        console.log(notes)
        residence.notes = notes;
        address = residence.currentResidence;
        console.log(residence)

        localStorage.setItem(address , notes);

    })


})


//Tried to create a function to clear the voterLayer markers from the map, but it's not working!

export {
    initializeMap,
    locateMe,
    populateVoterMap,
  };

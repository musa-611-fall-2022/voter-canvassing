let responseContainer = document.getElementById("response-container");
responseContainer.style.display = "none";

let firstStage = responseContainer;

let voterCard = document.createElement("div");
voterCard.id = "voterCard";

let address = "";
//let ID = "";

let people = document.createElement("ul");
let voterAddress = document.createElement("h2");

let closeVoterInfoButton = document.createElement("button");

//let openVoterNotesButton = document.createElement("button");

let voterNotes = document.createElement("div");
voterNotes.id = "voter-notes";

let saveVoterNotesButton = document.createElement("button");

let closeVoterNotesButton = document.createElement("button");

let loadNotes = document.createElement("p");
loadNotes.style.height = "50px";
loadNotes.style.border = "10px black";
loadNotes.innerHTML = "No notes for the residents of this building so far...";

let writeNotes = document.createElement("textarea");
writeNotes.style.height = "100px";
writeNotes.style.width = "250px";

//default-icon


const voter = {
    currentAddress: null,
    currentID: null,
    currentName: null,
    currentNotes: null,
    stillLivesThere: null,
    votingPlan: null,
    languageAssistance: null,
  };

  let map;

function initializeMap () {
    map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13); // made map global so that other functions can addTo 'map'
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

// function locateMe(map){

//     const successCallback = (pos) => {
//         if (map.positionLayer !== undefined) {
//             map.removeLayer(map.positionLayer);
//         }

//         myLocation = {
//             'type': 'Point',
//             'coordinates': [pos.coords.longitude, pos.coords.latitude]
//         };

//         map.positionLayer = L.geoJSON(myLocation).addTo(map);

//         // un-comment following line if we want the map to zoom to user location on startup:
//         //map.setView([pos.coords.latitude, pos.coords.longitude], 19);

//         return myLocation;

//     }
//     const errorCallback = (e) => console.log(e);

//     const options = { enableHighAccuracy: true, timeout: 10000 };

//     const id = navigator.geolocation.watchPosition(successCallback, errorCallback, options);

//     //navigator.geolocation.clearWatch(id); // will need this when we change location in real-time.

// }

function setTag(status){ // sets tag as green/red if any of the voter object yes/no questions are answered, grey if " " (blank)

    switch(status){
        case 'true':
            return "green";
        case 'false':
            return "red";
        case null:
            return "grey";
    }
}

function openVoterNotes(p){

    //openVoterNotesButton.style.display = "none";
    //responseContainer = blank ;

    let notes = document.createElement("div");
    notes.id = "notes";
    let tags = document.createElement("div");
    tags.id = "tags";
    let checkboxes = document.createElement("div");
    checkboxes.id = "checkboxes";
    let buttons = document.createElement("div");
    buttons.id = "buttons";

    voterNotes.innerHTML = " ";

    voterNotes.style.zIndex = "2";
    voterNotes.style.display = "flex";
    voterNotes.style.justifyContent = "space-between";
    voterNotes.style.width = "250px";
    voterNotes.style.height = "auto";

    let voterInfoQuestions = ['stillLivesThere', 'votingPlan', 'languageAssistance'];

    voter.currentID = p.id;
    voter.currentName = p.name;

    for( let n of voterInfoQuestions ){

        let item = voter.currentID.concat(" ").concat(n);
        console.log(item);
        voter[n] = localStorage.getItem(item);
    }    

    console.log(voter);

    // NOTES ONLY

    if(localStorage.getItem(voter.currentID) === null){
        loadNotes.innerText = "No notes for ID " + voter.currentID + " so far...";
        
    }

    else{
        loadNotes.innerText = localStorage.getItem(voter.currentID);
    }

    loadNotes.style.backgroundColor = "#217e79"
    loadNotes.style.width = "100%";
    loadNotes.style.height = "50%";
    loadNotes.border = "10px";
    loadNotes.borderRadius = "10px";

    writeNotes.text = " ";
    writeNotes.style.width = "100%";
    writeNotes.style.height = "50%";

    notes.style.position = "center";

    notes.appendChild(loadNotes);
    notes.appendChild(writeNotes);

    voterNotes.appendChild(notes);

    //TAGS ONLY in VOTER NOTES

    for( let t of voterInfoQuestions ){

        let item = voter.currentID.concat(" ").concat(t);
        console.log(item);

        let tag = document.createElement("button");
        tag.textContent = t;
        tag.style.color = "white";
        tag.style.backgroundColor = setTag(localStorage.getItem(item));
        tag.style.padding = "5px";
        tag.style.margin = "3px";
        tag.style.borderRadius = "3px";
        tag.style.fontSize = "10px";
        tag.style.zIndex ="2";

        tag.addEventListener('click', ()=>{
            console.log(voter[t])
            switch(voter[t]){
            case 'true':
                localStorage.setItem(item, 'false');
                setTag(localStorage.getItem(item));            
            case 'false':
               localStorage.setItem(item, 'true');
               setTag(localStorage.getItem(item));            
            
            case null:
               localStorage.setItem(item, 'true');
               setTag(localStorage.getItem(item));            
            }

            console.log(setTag(localStorage.getItem(item)));
            tag.style.backgroundColor = setTag(localStorage.getItem(item));

        });

        tags.appendChild(tag);

        }

        tags.style.display = "flex";
        tags.style.flexDirection = "row";

        voterNotes.appendChild(tags);

    
    //CHECKBOXES ONLY in VOTER NOTES


    for( let q of voterInfoQuestions ){

        let questionCheckbox = document.createElement("input");
        let checkboxLabel = document.createElement("label");
        questionCheckbox.type = "checkbox";
        questionCheckbox.id = q;
        questionCheckbox.value = q;

        if(voter[q] === true){
            questionCheckbox.checked = true;
        }
        else{
            questionCheckbox.checked = false;
        }

        checkboxLabel.htmlFor = q;
        checkboxLabel.appendChild(document.createTextNode(q));
        questionCheckbox.addEventListener('change', ()=>{
            let item = voter.currentID.concat(" ").concat(q)

            if(questionCheckbox.isChecked){
                localStorage.setItem(item, true);
                console.log('false, changing to true')
            }
            else if(!questionCheckbox.isChecked){
                localStorage.setItem(item, false);
            }
            else{
                localStorage.setItem(item, true);
            }
           
        });

        checkboxes.appendChild(questionCheckbox);
        checkboxes.appendChild(checkboxLabel);
        checkboxes.appendChild(document.createElement("br"));

    }

    checkboxes.style.display = "flex";
    checkboxes.style.alignItems = "flex-start";
    checkboxes.style.margin = "0px";

    //voterNotes.appendChild(checkboxes);

    //BUTTONS ONLY in VOTER NOTES


    saveVoterNotesButton.textContent = "Save Voter Notes";
    buttons.appendChild(saveVoterNotesButton);

    closeVoterNotesButton.textContent = "Close Voter Notes";
    buttons.appendChild(closeVoterNotesButton);

    buttons.style.display = "flex";
    buttons.style.flexDirection = "row";
    buttons.style.margin = "5px";
    buttons.style.zIndex = "3";

    voterNotes.appendChild(buttons);

    // PUT VOTER NOTES IN RESPONSE CONTAINER

    responseContainer.appendChild(voterNotes);

    closeVoterNotesButton.addEventListener('click', ()=>{
        voterNotes.innerHTML = " ";
        voterNotes.style.display = "none";
        //responseContainer = firstStage;
        //openVoterNotesButton.style.display = "flex";

    });

    saveVoterNotesButton.addEventListener('click', () =>{
        
        const notes = ("::").concat(writeNotes.value);
        console.log(notes);
        voter.currentNotes = notes;

        localStorage.setItem(voter.currentID, voter.currentNotes);

    });


}


function showPoint(point){
    if(!map.chosenLayer){
        map.chosenLayer = L.geoJSON(point, { pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
            style: {
                fillColor: "#1a5e5e",
                stroke: 0.6,
                color : "#c2b397",
                fillOpacity: 0.9,
                radius: 10,
            }}).addTo(map);
    }
    else{
        map.removeLayer(map.chosenLayer);
        map.chosenLayer = L.geoJSON(point, { pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
            style: {
                fillColor: "#1a5e5e",
                stroke: 0.6,
                color : "#c2b397",
                fillOpacity: 0.9,
                radius: 10,
            }}).addTo(map);
    }
}

function onEachFeature(feature, layer) {

    layer.on('click', function () {
        //console.log(feature.geometry)
        //L.marker(feature.geometry.coordinates).addTo(map);

        //residence.currentResidence = feature.properties.address;
        //residence.notes = localStorage.getItem(residence.currentResidence);
        //console.log(localStorage.getItem(voter.currentID));

        console.log(feature.geometry.coordinates);

        showPoint(feature);
        
        voter.currentAddress = feature.properties.address; // start by moving pointer to selected building
        //voter.currentID = feature.voters
        //voter.currentNotes = localStorage.getItem(voter.currentID);
        voterNotes.style.display = "none"; // right now sub-menu is inactive

        //alert(feature.properties.address);
        responseContainer.style.display = "flex"; // address details become live
        people.innerHTML = ""; // people in this building will be populated, blank for now
        voterAddress.innerHTML = voter.currentAddress; // the HTML element showing the address now has the current objects address - DYNAMIC!

        //firstStage = responseContainer;

        responseContainer.appendChild(voterAddress);
        let residents = feature.voters; // an array of residents living in this building

        for( let r = 0; r < residents.length; r++ ){

            console.log(residents[r].name);

            let person = document.createElement("button"); // create a button for each resident - will use this to fill the voter object - DYNAMIC!
            person.textContent = residents[r].name;
            person.innerHTML = residents[r].name;
            person.value = residents[r].id;

            person.style.display = "flex";

            person.addEventListener('click', ()=>{
                openVoterNotes(residents[r]);
            });

            people.appendChild(person);
            people.style.margin = "0px";
        }

        responseContainer.appendChild(people);

        closeVoterInfoButton.textContent = "Exit Address";
        responseContainer.appendChild(closeVoterInfoButton);

    });
}

closeVoterInfoButton.addEventListener('click', () =>{
    responseContainer.style.display = "none";
});

function populateVoterMap(people, map) { // receives data from makeVoterFeature and plots them on the map

    console.log("These are the voters");
    map.removeLayer(map.voterLayer);

    // if (map.voterLayer !== undefined) {
    //     map.removeLayer(map.voterLayer);
    map.voterLayer = L.geoJSON(people, { pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
        style: {
            fillColor: "orange",
            stroke: null,
            fillOpacity: 0.9,
            radius: 7,
        },
        onEachFeature : onEachFeature,
     }).addTo(map);
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

//Tried to create a function to clear the voterLayer markers from the map, but it's not working!

export {
    initializeMap,
    populateVoterMap,
  };

  window.voter = voter;
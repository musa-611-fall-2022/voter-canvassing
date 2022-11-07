import { makeVoterFeature } from './dataPull.js';
import { populateVoterMenu } from './list.js';

let map = []; // made map global so that other functions can addTo 'map'
let myLocation = {}; // made a global myLocation variable that can be accessed when looking for other point features in the vicinity


function initializeMap () {
    map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13); // made map global so that other functions can addTo 'map'
    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoibW9yZ2FuZ3IiLCJhIjoiY2w4dzF2bHZsMDJqdDN3czJwOGg0ZXBsbSJ9.tXRhvJAL-t7cJCrCyAEhUw';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 19,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    return map;
}

function locateMe(){

    const successCallback = (pos) => {
        myLocation = {
            lat : pos.coords.longitude,
            lng : pos.coords.latitude,
        };

        console.log(myLocation);

        L.marker([myLocation.lng, myLocation.lat]).addTo(map);

        return myLocation;

    }
    const errorCallback = (e) => console.log(e);

    const options = { enableHighAccuracy: true, timeout: 10000 };

    const id = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

    //navigator.geolocation.clearWatch(id); // will need this when we change location in real-time.

}

function populateVoterMap(data, map) { // receives data from makeVoterFeature and plots them on the map

    let people = makeVoterFeature(data);

    console.log("These are the voters");

    for( let ppl of people ){

        try{
        L.marker(ppl.geometry.coordinates).bindPopup(ppl.properties['address']).addTo(map);
        }
        catch(e){
            // pass
        }
    }

}

export {
    initializeMap,
    locateMe,
    populateVoterMap,
  };

  window.myLocation = myLocation;
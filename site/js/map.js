import { makeVoterFeature } from './dataPull.js';
import { populateVoterMenu } from './list.js';

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
        map.setView([pos.coords.latitude, pos.coords.longitude], 19);

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
         map.voterLayer = L.geoJSON().addTo(map);
    // }

    for( let ppl of people ){
        try{
        L.marker(ppl.geometry.coordinates).bindPopup(ppl.properties['address']).addTo(map);
        // TODO: figure out how to get geoJSONs to work in new layer
        // map.voterLayer.addData(ppl);
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

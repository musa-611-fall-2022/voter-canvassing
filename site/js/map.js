/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-11-11 03:00:55
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-11-16 06:49:21
 * @FilePath: \voter-canvassing\site\js\map.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import{ csvtojson } from './managedata.js';
import{ ShowVotersList } from './list.js';

function onvoterClicked(evt) {
    console.log(evt);
    const voter = evt.layer.feature;

    const voterSelectedEvent = new CustomEvent('voter-selected', { detail: { voter } });
    window.dispatchEvent(voterSelectedEvent);
}

function initMap() {
    const map = L.map('voterMap', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13);

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

    map.treeLayer.addEventListener('click', onvoterClicked);

    map.positionLayer = L.geoJSON(null).addTo(map);

    return map;
}

//convert a json to a geojson-like feature
function makevoterFeature(voter)
{
    return {
        "type": "Feature",
        "id": voter['ID Number'],
        "properties": {
            "Last Name":voter['Last Name'],
            "First Name": voter['First Name'],
            "Registration Date": voter['Registration Date'],
            "Voter Status": voter['Voter Status'],
            "Party Code": voter['Party Code'],

        },
        "geometry":
        {   "type": "Point",
            "coordinates":[voter['28'].substr(0, 18), voter['28'].substr(19, voter.length)],

        },
        };
}

//Use the function to display the voters' location on the map.
function showVotersOnMap(votersToShow_json, voterMap) {
    if (voterMap.voterLayer !== undefined){
        voterMap.removeLayer(voterMap.voterLayer);
    }

    const voterFeatureCollection = {
        "type": "FeatureCollection",
        "features": votersToShow_json.map(makevoterFeature),//excuate one by one, convert json like data to geojson like feature
        
    };
    
    
    voterMap.voterLayer = L.geoJSON(voterFeatureCollection, {
        pointToLayer: (feature, latlng) => L.circleMarker(latlng),
        style:  {
            fillColor: '#53C131',
            fillOpacity: 0.5,
            radius:6,
            stroke: true,
            weight:0.5,
            color:'#000000',
        },
        }).addTo(voterMap);
    }


//designed for the "search" buttom, use this function to search the voters by listNo. both on map and lists
function Search (map, search, votersToShow) {
    search.addEventListener('click', () => {
        let votersToShow1 = votersToShow.value;
        csvtojson(map, votersToShow1);
        ShowVotersList(votersToShow1);
        
    });

}

function updateUserPositionOn(map, pos) {
    map.positionLayer.addData({
      'type': 'Point',
      'coordinates': [pos.coords.longitude, pos.coords.latitude],
    });
    map.setView([pos.coords.latitude, pos.coords.longitude], 18);
  }


export{
        initMap,
        showVotersOnMap,
        Search,
        updateUserPositionOn,

};

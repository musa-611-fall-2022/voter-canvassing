/*
 * @Author: miaomiao612 dddoctorr612@gmail.com
 * @Date: 2022-11-11 03:00:55
 * @LastEditors: miaomiao612 dddoctorr612@gmail.com
 * @LastEditTime: 2022-11-15 13:15:14
 * @FilePath: \voter-canvassing\site\js\map.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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


//convert json to a geojson-like feature
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
            "coordinates":voter['TIGER/Line Lng/Lat'],

        },
        };
}

//Use the function to display the voters' location on the map.
function showVotersOnMap(votersToShow, map) {
    if (map.voterLayer !== undefined){
        map.removeLayer(map.voterLayer);
    }

    const voterFeatureCollection = {
        "type": "FeatureCollection",
        "features": votersToShow.map(makevoterFeature),
    };
    map.voterLayer = L.geoJSON(voterFeatureCollection, {
        pointToLayer: (feature, latlng) => L.circleMarker(latlng),
        style: {
            fillColor: '#83bf15',
            fillOpacity: 0.3,
            stroke: false,
        },
        }).addTo(map);
    }

    export{
        initMap,
        showVotersOnMap,
        makevoterFeature,
};
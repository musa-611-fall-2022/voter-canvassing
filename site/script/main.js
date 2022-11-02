let app = {
    currentTree: null,
    notes: JSON.parse(localStorage.getItem('notes') || '{}')
};

function initMap() {
    const map = L.map('map', {maxZoom: 22, preferCanvas: true }).setView([39.995, -75.13], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/keelbn/cl8w1pun9001514odcvwo00gb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw', {
        maxZoom: 22,
        minZoom: 10,
        attribution: '© OpenStreetMap',
    }).addTo(map);

    map.treeLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.circleMarker(latlng)
    }).addTo(map);

    map.treeLayer.addEventListener('click', onTreeClicked);

    map.positionLayer = L.geoJSON(null).addTo(map);

    return map;
}

function downloadInventory() {
    fetch('data/PPR_Tree_Inventory_2021.geojson')
    .then(resp => resp.json())
    .then(data => {
        map.treeLayer.addData(data)
    });
}

function userPositionSuccess(pos){
    console.log(pos);
    map.positionLayer.addData({
        'type': 'Point', 
        'coordinates': [pos.coords.longitude, pos.coords.latitude]
    });
    map.setView([pos.coords.latitude, pos.coords.longitude], 19); 
}

function userPositionFailure(err){
    console.log(err);
}

function setupGeolocationEvent() {
    navigator.geolocation.getCurrentPosition(
        userPositionSuccess,
        userPositionFailure,
    )
}

const map = initMap();
downloadInventory();
setupGeolocationEvent();
setupTreeInfoForm();

window.app = app;
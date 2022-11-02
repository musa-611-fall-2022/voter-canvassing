let app = {
    currentTree: null,
    notes: JSON.parse(localStorage.getItem('notes') || '{}')
};

const treeNameEl = document.getElementById('tree-name');
const treeNotesEl = document.getElementById('tree-notes');
const saveTreeNotesEl = document.getElementById('save-tree-notes');


function onTreeClicked(evt) {
    console.log(evt);
    const tree = evt.layer.feature;
    const treeid = tree.properties['OBJECTID'];
    const treename = tree.properties['TREE_NAME'];
    app.currentTree = tree;


    treeNameEl.innerHTML = treename;
    treeNotesEl.value = app.notes[treeid] || '';

}

function onSaveButtonClicked(evt) {
    const treeNote = treeNotesEl.value;
    const treeId = app.currentTree.properties['OBJECTID'];
    app.notes[treeId] = treeNote;

    localStorage.setItem('notes', JSON.stringify(app.notes));
}

function setupTreeInfoForm() {
    saveTreeNotesEl.addEventListener('click', onSaveButtonClicked);
}

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
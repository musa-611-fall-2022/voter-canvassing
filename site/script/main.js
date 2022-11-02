let app = {

};

function initMap() {
    const map = L.map('map', {maxZoom: 22, preferCanvas: true }).setView([39.995, -75.13], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/keelbn/cl8w1pun9001514odcvwo00gb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw', {
        maxZoom: 22,
        minZoom: 10,
        attribution: '© OpenStreetMap',
    }).addTo(map);

    return map;
}

const map = initMap();

window.app = app;
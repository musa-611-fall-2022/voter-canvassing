function initMap() {
    const map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.995, -75.13], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/keelbn/cl8w1pun9001514odcvwo00gb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw', {
        maxZoom: 22,
        minZoom: 10,
        attribution: '© OpenStreetMap',
    }).addTo(map);

    map.voterLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng),

    style: {
      // fillColor: '#83bf15',
        fillOpacity: 1,
        radius: 3,
        stroke: null,
    },
    }).bindTooltip(Layer => Layer.feature.properties['ID Number']).addTo(map);

    return map;
}

function loadList(data) {
    let addressList = $("#addressList");
    $("#address-container").css("display", "block");
    showAddressesInList(data, addressList);
    showVotersOnMap(data);
}


//  Use the function to display all the schools data on the map
function showVotersOnMap(data) {
    if (map.voterLayer !== undefined) {
        map.removeLayer(map.voterLayer);
        map.voterLayer = L.geoJSON(null, {
            pointToLayer: (feature, latlng) => L.circleMarker(latlng),
            style: {
              // fillColor: '#83bf15',
                fillOpacity: 1,
                radius: 3,
                stroke: null,
            },
            }).bindTooltip(Layer => Layer.feature.properties['ID Number']).addTo(map);
    }
    // Set view lonlat
    map.setView([data["features"][0]["geometry"]["coordinates"][1], data["features"][0]["geometry"]["coordinates"][0]], 16);
    map.voterLayer.addData(data);
    console.log(data);
}

export {
    initMap,
    loadList,
};
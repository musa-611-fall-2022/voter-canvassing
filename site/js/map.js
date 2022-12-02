let map;

function initMap() {
    map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1Ijoic2ltcmFuLWFyby1tYXAiLCJhIjoiY2xhdTJlMm9yMDI1ZTN4cHJvZW51Nno4NCJ9.rcqye_8iI_wAlqbcNVTlog';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);

    map.voterLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => L.circleMarker(latlng),
        style: {
            fillColor: '#83bf15',
            fillOpacity: 0.3,
            stroke: false,
        },
    }).addTo(map);

    map.positionLayer = L.geoJSON(null).addTo(map);
    

    return map;
};




export {
    initMap
};

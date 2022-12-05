function initMap () {
    let map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13);
    L.tileLayer(`https://api.mapbox.com/styles/v1/stusingh/clau22q7r000r14tak3lcc0pa/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3R1c2luZ2giLCJhIjoiY2xhdTF3YmJrMDF5NTNvbXQ3cDVxcDR6diJ9.nWcntIfPv5_Jkt0YVKhfLg&zoomwheel=true&fresh=true#11/40.73/-74`, {
        maxZoom: 19,
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    }).addTo(map);
  /*
    map.voterLayer = L.geoJSON(null, {
      pointToLayer: (geojsonFeature, latlng) => L.circleMarker(latlng),
      style: {
        fillColor: '#83bf15',
        fillOpacity: 0.3,
        stroke: false,
      },
    }).addTo(map);*/
  
      return map;
    }
  
    
  export {
    initMap,
  };
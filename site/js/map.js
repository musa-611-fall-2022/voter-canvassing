function initMap () {
  let map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 11.5);
  L.tileLayer(`https://api.mapbox.com/styles/v1/simran-aro-map/clbcy72bk001615nu08334s8v/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2ltcmFuLWFyby1tYXAiLCJhIjoiY2xhdTJlMm9yMDI1ZTN4cHJvZW51Nno4NCJ9.rcqye_8iI_wAlqbcNVTlog&zoomwheel=true&fresh=true#12.14/40.73311/-73.97065`, {
      maxZoom: 22,
      attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
  }).addTo(map);
    return map;
  }

  
export {
  initMap,
};
  

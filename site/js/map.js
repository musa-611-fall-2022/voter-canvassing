//set initial map using leaflet
import { showVoterInList } from './voter-list.js'


///该功能发生在点击地图上的点之后
function onvoterClicked(evt) {
  //show voter information
  const voter = evt.layer.feature;
  
  const voterSelectedEvent = new CustomEvent('voter-selected', { detail: { voter } });
  window.dispatchEvent(voterSelectedEvent);

  const voterNameEl = document.getElementById('load-overlay');
  const voterName = `${voter.properties['First_Name']} ${voter.properties['Last_Name']}, ${voter.properties['Address']}` ;
  voterNameEl.innerHTML = voterName;

  //highlight clicked voter
  if (voterMap.pLayer !== undefined){
    voterMap.removeLayer(voterMap.pLayer);
    }
  voterMap.pLayer = L.circleMarker(evt.latlng).addTo(voterMap);
  voterMap.pLayer.setStyle({
    icon: "https://maps.gstatic.com/mapfiles/markers2/marker.png",
    color: '#ad4b5a', // Red
    fillColor: '#6195ed', // Blue
    fillOpacity: 0.5,
    radius: 5,
  });

  //highlight voter list
  let stopList = document.querySelector("#voterList")
  stopList.innerHTML = '';
  const html = `
  <li class="selected"> ${voter.properties['First_Name']} ${voter.properties['Last_Name']} </li>
  `;
  const li = htmlToElement(html);
  stopList.append(li);
}

///该功能位地图初始设置
function initMap() {
    const map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 13);

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

//该功能turn array into feature
function makeVoterFeature(voter) {
    return {
      "type": "Feature",
      "id": voter['0'],
      "properties": {
        'First_Name': voter['3'],
        'Last_Name':voter['2'],
        'Address':`NO.${voter['12']+' '+voter['14']}`
      },
      "geometry": {
        "type": "Point",
        "coordinates": [voter['28'].substr(0, 18), voter['28'].substr(19, voter.length)],
      },
    };
  }

//该功能show feature on map
  function showVotersOnMap(map, VotersToShow) {
  if (map.VoterLayers !== undefined) {
    map.removeLayer(map.VoterLayers);
  }

  const VoterFeatureCollection = {
    "type": "FeatureCollection",
    "features": VotersToShow.map(makeVoterFeature),
  };

  map.VoterLayers = L.geoJSON(VoterFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
      stroke: null,
      fillOpacity: 0.9,
      radius: 3,
    },
  })
  .addTo(map);
  map.VoterLayers.addEventListener('click', onvoterClicked);
  }

//该功能turn csv to array
function loadData (map, neighbor, onFailure){
let voter_list = document.querySelector("#voterList");

fetch(`./voters_lists/${neighbor}.csv`)
  .then(response => {
    if (response.status === 200) {
      const data = response.text();
      return data;
    } else {
      alert('Oh no, I failed to download the data.');
      if (onFailure) { onFailure() }
    }
  })
  .then(v => Papa.parse(v, { delimiter:"," }))
  .catch(err => console.log(err))
  .then(result => {
    let v = result.data.slice(1, result.data.length-1);
    return v;
})
  .then(result => {
    showVotersOnMap(map, result);
    return result;})
  .then(result =>{
    showVoterInList (result, voter_list);
  })
  
  
  
  
}

//该功能reset position to input neighbor
function posMap (map, neighbor){
  fetch(`./voters_lists/${neighbor}.csv`)
    .then(response => {
        const data = response.text();
        return data;
    })
    .then(v => Papa.parse(v, { delimiter:"," }))
    .catch(err => console.log(err))
    .then(result => {
      map.positionLayer.addData({
        'type': 'Point',
        'coordinates': [ result.data['20']['28'].substr(19, result.data['20']['28'].length), result.data['20']['28'].substr(0, 18)],
      });
      map.setView([ result.data['20']['28'].substr(19, result.data['20']['28'].length), result.data['20']['28'].substr(0, 18)], 16);
      ;
  });
  }
  
//该功能search targetted neighborhood
function searchNeighbor(map, searchOnClicked, neighborInput) {
searchOnClicked.addEventListener('click', () => {
  let neighbor = neighborInput.value;
  loadData(map, neighbor);
  posMap(map, neighbor);
});
document.getElementById('neighbor-name-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
  let neighbor = neighborInput.value;
  loadData(map, neighbor);
  posMap(map, neighbor);
  }
});
}

//该功能用于在一开始开始显示使用者位置
function updateUserPositionOn(map, pos) {
  map.positionLayer.addData({
    'type': 'Point',
    'coordinates': [pos.coords.longitude, pos.coords.latitude],
  });
  map.setView([pos.coords.latitude, pos.coords.longitude], 19);
}


export {
    initMap,
    searchNeighbor,
    updateUserPositionOn,
};
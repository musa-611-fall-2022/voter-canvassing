
function initializevoteMap () {
    let voteMap = L.map('vote-map').setView([39.952436849966794,-75.16356820883757], 11);

    const mapboxAccount = 'mapbox';
    const mapboxStyle = 'light-v10';
    const mapboxToken = 'pk.eyJ1IjoieWVzZW5pYW8iLCJhIjoiY2tlZjAyM3p5MDNnMjJycW85bmpjenFkOCJ9.TDYe7XRNP8CnAto0kLA5zA';
    L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`, {
    maxZoom: 19,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
}).addTo(voteMap);

    return voteMap;
}


//判断坐标是否可用
function coordsAreValid(lng, lat) {
  let result = false;
  if(typeof(lng) == "number" && typeof(lat) == "number") {
    if(lng < -73 && lng > -77 && lat < 41 && lat > 38) {
      result = true;
    }
  }
  return result;
}




//整理关键信息
function makeVoterFeatureCollection(thisData) {

  // Construct a geojson empty frame
  const voters = {
    type: "FeatureCollection",
    features: [],
  };

  // Write into geojson
  for(let i = 0; i < thisData.length; i++) {
    let thisLngLat = thisData[i]["TIGER/Line Lng/Lat"];
    if(typeof(thisLngLat) == "string"){

      let thisLng = Number(thisLngLat.split(",")[0]);
      let thisLat = Number(thisLngLat.split(",")[1]);

      if(coordsAreValid(thisLng, thisLat)) {
        voters.features.push( {
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [thisLng, thisLat],
          },
          "properties": {
              "id": thisData[i]["ID Number"],
              "last_name": thisData[i]["Last Name"],
              "first_name": thisData[i]["First Name"],
              "address": thisData[i]["short_address"],
          },
        });
      }
    }
  }
  return voters;
}



// When showing on the map, we show only one marker per short_address
//去重，一个地址只有一个voter
function sliceByKey(data, key) {
  let dataUniqueAddress = data.reduce((result, thisItem) => {
    let thisCategory = thisItem[key];
    // Add item if its key is not added yet
    if(result.find(item => item[key] === thisCategory) == undefined) {
        result.push(thisItem);
    } else {
      // empty
    }
    return result;
  }, []);

  return dataUniqueAddress;
}



function showVotersOnMap(thisData) {
  let dataUniqueAddress = sliceByKey(thisData, "short_address");
  let voterFeatures = makeVoterFeatureCollection(dataUniqueAddress);
  if(voteMap.voterLayers !== undefined) {
    voteMap.removeLayer(voteMap.voterLayers);
  }
  voteMap.voterLayers = L.geoJSON(voterFeatures, {
    pointToLayer: (point, latLng) => L.circleMarker(latLng),
    style: {
      radius: 7,
      color: "#999999",
      stroke: true,
      opacity: 0.5,
      weight: 2,
    },
  })
  //.on("click", voterMarkerOnClick);
  .addTo(voteMap);
}




export {
    initializevoteMap,
    showVotersOnMap,
    makeVoterFeatureCollection,
 };
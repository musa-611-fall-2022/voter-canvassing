function initMap() {
    const map = L.map('map', {maxZoom: 22, preferCanvas: true }).setView([39.995, -75.13], 12);

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

function loadList() {
    let listName = document.querySelector('#voterFileInput').value;
    const url = '../site/data/voters_lists/' + listName + '.csv'
    $.ajax(url, {
        success: (record) => {
            //Split according to \n
            record = record.split("\r\n");

            //First line is title
            var title = record[0].split(",");
            //Delete the first line
            record.shift();

            let data = {
                "type": "FeatureCollection",
                "features": []
            }

            for (var i = 0; i < record.length - 1; i++) {
                if (record[i]) {
                    var t = record[i].split(/,s*(?![^"]*"\,)/);
                    for (var y = 0; y < t.length; y++) {
                        if (!data["features"][i])
                            data["features"][i] = {"type": "Feature", "properties": {}, "geometry": { "type": "Point", "coordinates": []}};
                        data["features"][i]["properties"][title[y]] = t[y];
                    }

                    let lonlat = [];
                    lonlat = data["features"][i]["properties"]["TIGER/Line Lng/Lat"].split(',');

                    // If the lonlat list is not NULL
                    if (lonlat.length === 2) {
                        data["features"][i]["geometry"]["coordinates"][0] = parseFloat(lonlat[0].substring(1,));
                        data["features"][i]["geometry"]["coordinates"][1] = parseFloat(lonlat[1].substring(0,lonlat[1].length - 1));
                    }
                    else {
                        data["features"].pop();
                    }
                }
            }
            showVotersOnMap(data)
        },

        error: (err) => {
            alert('Oh no, I failed to download the data.');
        }
    });
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
    map.setView([data["features"][0]["geometry"]["coordinates"][1], data["features"][0]["geometry"]["coordinates"][0]], 16)
    map.voterLayer.addData(data);
    console.log(data)
}

export {
    initMap,
    loadList
}
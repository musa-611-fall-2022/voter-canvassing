import {initMap, loadList} from "./map.js";
import {showVotersInList} from "./voterList.js";
import {showAddressesInList} from "./addressList.js";
import {showDetails} from "./detailsList.js";

//creating global trackers for the active list and Address for other functions
let app = {
    currentList: null,
    currentAddress: null,
};

let map = initMap();

let voteList = document.querySelector('#voterList');
// var fs = require('fs');
// var files = fs.readdirSync('../site/data/voters_lists');
// console.log(files)

let votersNames = [];
for (let i = 101; i <= 6646; i++) {
    votersNames.push(i.toString().padStart(4, '0'))
}

// showVotersInList(votersNames, voteList);

let voterNameFilter = document.querySelector('#voterFileInput');

function listFilter() {
    let filteredVoters = votersNames;
    const text = voterNameFilter.value;
    filteredVoters = votersNames.filter(function (voter) {
        const hasText = voter.includes(text);
        return hasText;
    });
    return filteredVoters;
}

// Get current input box's list address data
function getListData(url) {
    let data = {
        "type": "FeatureCollection",
        "features": []
    }
    $.ajax({
        url,
        async: false,
        success: (record) => {
            //Split according to \n
            record = record.split("\r\n");

            //First line is title
            var title = record[0].split(",");
            //Delete the first line
            record.shift();

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
        },
        error: (err) => {
            alert('Oh no, I failed to download the data.');
        }
    });
    return data;
}

let currentListData;

// When click the "Load List" button, load the address
$("#voterFileLoadButton").click(function() {
    let listName = document.querySelector('#voterFileInput').value;
    const url = '../site/data/voters_lists/' + listName + '.csv';
    currentListData = getListData(url);;
    loadList(currentListData);
});

voterNameFilter.addEventListener('input', () => {
    const text = voterNameFilter.value;

    // Filter the lists according to the inputText
    const filteredVoters = listFilter();

    // Show the filtered lists
    showVotersInList(filteredVoters, voteList);

    // Add onClick function to all the list tag
    let voterLists = document.getElementsByClassName("list-group-item");

    for (const list of voterLists) {
        list.addEventListener('click', function onClick() {
            console.log(list.innerHTML);
            // If the list is clicked, replace the inputText with the list's content.
            voterNameFilter.value = list.innerHTML;

            // After selecting the list, we hide the voterList module
            let obj = document.getElementById("voterList");
            obj.style.display = 'none';
        });
    }

    // If the inputText is null, we hide the voterList module, or we show them.
    if (text != '') {
        let obj = document.getElementById("voterList");
        obj.style.display = 'block';
    } else {
        let obj = document.getElementById("voterList");
        obj.style.display = 'none';
    }
});

function onAddressSelected(evt) {
    const home = evt.detail.home;
    app.currentAddress = home;
    console.log(app.currentAddress);
    showDetails(currentListData, app.currentAddress, document.querySelector("#addressList"))
}

window.addEventListener('address-selected', onAddressSelected);

window.app = app;
window.map = map;
window.currentListData = currentListData;
window.loadList = loadList;
window.showAddressesInList = showAddressesInList;
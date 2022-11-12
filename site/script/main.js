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
}

window.addEventListener('address-selected', onAddressSelected);

window.app = app;
window.map = map;
window.loadList = loadList;
window.showAddressesInList = showAddressesInList;
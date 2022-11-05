// function showVotersInList(data) {
//   ;
//   // Should add event listener on every voter in the list
//   // Use something to store the id of the selected voter
// }

import { htmlToElement } from './htmlelement.js';

let voterList = document.querySelector('#voter-list');

// Function to turn array of voters into a two-level array grouped by address
// Use reduce; Initiate address if not already; append voter to address
function groupByKey(data, key) {
  let dataGroupedByAddress = data.reduce((grouped, thisItem) => {
    let thisCategory = thisItem[key];
    grouped[thisCategory] = grouped[thisCategory] || []; // Initialize if not existing
    grouped[thisCategory].push(thisItem);
    return grouped;
  }, {});

  return dataGroupedByAddress;
}

// The output voters are grouped by their addresses
// Show address
function addAddressToList(address) {
  const addressEl = htmlToElement(`
    <li class="list-address">
      ${address}
    </li>
  `);
  voterList.append(addressEl);
}

// Function to show voters by each address
function addVotersByAddress(votersByThisAddress) {
  for(const voter of votersByThisAddress) {
    const voterEl = htmlToElement(`
      <li>
        <div class="list-name">${voter["First Name"]} ${voter["Last Name"]}</div>
        <div class="button"></div>
        <div class="button"></div>
        <div class="button"></div>
        <div class="button"></div>
      </li>
    `);
    voterList.append(voterEl);
  }
}

function showVotersInList(data) {
  // First empty out existing voter list
  voterList.innerHTML = '';

  let dataGroupedByAddress = groupByKey(data, "Street Name");
  let addressKeys = Object.keys(dataGroupedByAddress);

  for(const address of addressKeys) {
    addAddressToList(address);
    let votersByThisAddress = dataGroupedByAddress[address];
    addVotersByAddress(votersByThisAddress);
  }
}

export {
  showVotersInList,
  voterList,
};

/*
Requirement:
The list's DOM element should be available on the global
*/

window.voterList = voterList;
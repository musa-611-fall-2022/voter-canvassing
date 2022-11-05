import { htmlToElement } from './htmlelement.js';
// import { changeRecord } from "./save-edit";

// DOM obj of voter list
let voterList = document.querySelector('#voter-list');

// DOM obj of each voter list item
let voterListItemsEl;

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

let selectedVoterId;

// Function: highlight selected voter in the list
function highlightVoterInList(thisListItem) {
  // Initialize: remove all existing highlighted voters, if any
  for(const listItem of voterListItemsEl) {
    listItem.className = "list-voter";
  }
  // Highlight selected voter
  thisListItem.classList.add("list-selected");
}

// Function: prepare the voterlist, i.e., add event listener
function listPrepare(voterListItemsEl) {
  for(const thisListItem of voterListItemsEl) {
    thisListItem.addEventListener("click", () => {
      highlightVoterInList(thisListItem);
      selectedVoterId = thisListItem.title;
      console.log(selectedVoterId);
    });
  }
}

// Function to show voters by each address
function addVotersByAddress(votersByThisAddress) {
  for(const voter of votersByThisAddress) {
    const voterEl = htmlToElement(`
      <li class="list-voter" value=0 title="${voter["ID Number"]}">
        <div class="list-name">${voter["First Name"]} ${voter["Last Name"]}</div>
        <div class="list-icon button">
          <span class="material-symbols-outlined">
            hourglass_top
          </span>
        </div>
        <div class="button list-icon"></div>
        <div class="button list-icon"></div>
        <div class="button list-icon"></div>
      </li>
    `);
    voterList.append(voterEl);
  }
}

function showVotersInList(data) {
  // First empty out existing voter list
  voterList.innerHTML = '';

  let dataGroupedByAddress = groupByKey(data, "short_address");
  let addressKeys = Object.keys(dataGroupedByAddress);

  for(const address of addressKeys) {
    addAddressToList(address);
    let votersByThisAddress = dataGroupedByAddress[address];
    addVotersByAddress(votersByThisAddress);
  }
  voterListItemsEl = document.querySelectorAll(".list-voter");
  listPrepare(voterListItemsEl);
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
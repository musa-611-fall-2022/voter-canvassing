import { htmlToElement } from './htmlelement.js';
import { changeRecord } from "./save-edit.js";
import { onSelectAction } from "./selected-voter.js";
import { expandButtonEl } from "./voter-list-expand.js";

// DOM obj of voter list
let voterList = document.querySelector('#voter-list');

// DOM obj of each voter list item
// Not defined yet; defined in showVotersInList;
export let voterListItemsEl;

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
// Function to show address
function addAddressToList(address) {
  const addressEl = htmlToElement(`
    <li class="list-address">
      ${address}
    </li>
  `);
  voterList.append(addressEl);
}

// Function: prepare the voterlist, i.e., add event listener
function listPrepare(voterListItemsEl) {
  for(const thisListItem of voterListItemsEl) {
    thisListItem.addEventListener("click", () => {
      let thisId = thisListItem.title;
      onSelectAction(thisId);
    });
  }
}

// Function to get the canvassing status (visited, pendign, etc.) for each voter
function getCanvassStatusIcon(voterId) {
  const canvassStatus = changeRecord[voterId] || "pending";

  // Default icon: pending hourglass
  let canvassStatusIcon = `<span class="material-symbols-outlined">hourglass_top</span>`;
  if(canvassStatus == "pending") {
    canvassStatusIcon = `<span class="material-symbols-outlined">hourglass_top</span>`;
  } // Other icons to be added
  return(canvassStatusIcon);
}

// Function to get the voter status (active or inactive) for each voter
function getVoterStatusIcon(voter) {
  const activeVoterIcon = `<span class="material-symbols-outlined icon-ok-color">check_circle</span>`;
  const inactiveVoterIcon = `<span class="material-symbols-outlined icon-no-color">close</span>`;

  const voterStatusIcon = voter["Voter Status"] == "A" ? activeVoterIcon : inactiveVoterIcon;

  return voterStatusIcon;
}

// Function to get the party for each voter
function getPartyColor(voter) {
  const democratColor = "icon-democrat-color";
  const republicanColor = "icon-republican-color";
  const otherPartyColor = "icon-oth-party-color";

  let partyColor;
  switch(voter["Party Code"]) {
    case "D":
      partyColor = democratColor;
      break;
    case "R":
      partyColor = republicanColor;
      break;
    default:
      partyColor = otherPartyColor;
  }

  return partyColor;
}

// Function to show voters by each address
function addVotersByAddress(votersByThisAddress) {
  for(const voter of votersByThisAddress) {

    // Get current voter ID
    const voterId = voter["ID Number"];

    // Get voter status icon
    const voterStatusIcon = getVoterStatusIcon(voter);

    // Check canvassing status of this voter and get the icon
    const canvassStatusIcon = getCanvassStatusIcon(voterId);

    // Check party affiliation
    const party = voter["Party Code"];
    const partyColor = getPartyColor(voter);

    const voterEl = htmlToElement(`
      <li class="list-voter" value=0 title="${voter["ID Number"]}">
        <div class="list-name">${voter["First Name"]} ${voter["Last Name"]}</div>
        <div class="list-icon">${canvassStatusIcon}</div>
        <div class="list-icon">${voterStatusIcon}</div>
        <div class="list-icon ${partyColor}">${party}</div>
      </li>
    `);
    voterList.append(voterEl);
  }
}

// Function to decide whether to show voter list's expand button
function showHideExpandButton() {
  let voterListHeight = document.querySelector("#voter-list").offsetHeight;
  let voterContainerHeight = document.querySelector("#voter-list-component").querySelector(".scroll-container").offsetHeight;
  if(voterListHeight > voterContainerHeight){
    expandButtonEl.style.display = "block";
  } else {
    expandButtonEl.style.display = "none";
  }
}

function showVotersInList(data) {
  // First empty out existing voter list
  voterList.innerHTML = '';

  let dataGroupedByAddress = groupByKey(data, "short_address");
  window.test = data;
  let addressKeys = Object.keys(dataGroupedByAddress);

  for(const address of addressKeys) {
    addAddressToList(address);
    let votersByThisAddress = dataGroupedByAddress[address];
    addVotersByAddress(votersByThisAddress);
  }
  voterListItemsEl = document.querySelectorAll(".list-voter");
  window.voterListItemsEl = voterListItemsEl;
  listPrepare(voterListItemsEl);

  // Only show expand button when necessary
  showHideExpandButton();
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

/*
Requirement:
Wrap each voter's name in an element with the class `voter-name`.
Wrap addresses in an element with the address `voter-address`.
Make sure the class names match.
*/
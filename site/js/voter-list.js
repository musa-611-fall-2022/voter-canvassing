/*
MODULE 4: Voters display (on the map)
==================================================
Every time a new list is loaded, or when the filter(s) are changed
voters need to be updated both on the map and in the list
This script deals with the list
1. Create HTML elements of the voters to be added to the voter list
2. Note that these are group by ADDRESS
3. Add event listener to prepare for MODULE 4: VOTER SELECTION
*/

import { htmlToElement } from './htmlelement.js';
import { onSelectAction } from "./selected-voter.js";
import { voterListExpandButtonEl } from "./list-expand.js";

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

// Function: prepare the voterlist for the next module (voter selection)
function listPrepare(voterListItemsEl) {
  for(const thisListItem of voterListItemsEl) {
    thisListItem.addEventListener("click", () => {
      let thisId = thisListItem.title;
      onSelectAction(thisId);
    });
  }
}

// Function to get the canvassing status (visited, pendign, etc.) for each voter
function getCanvassStatusIcon(voter) {
  // Default to hourglass (pending)
  let canvassStatusIcon = `<span class="material-symbols-outlined icon-gray-color">hourglass_top</span>`;
  if(voter["canvass-status"]) {
    if(voter["canvass-status"] === "completed") {
      canvassStatusIcon = `<span class="material-symbols-outlined icon-ok-color">task_alt</span>`;
    } else if(voter["canvass-status"] === "awaits-followup") {
      canvassStatusIcon = `<span class="material-symbols-outlined icon-notify-color">timeline</span>`;
    }
  }
  return canvassStatusIcon;
}

// Function to get the voter status (active or inactive) for each voter
function getVoterStatusIcon(voter) {
  const activeVoterIcon = `<span class="material-symbols-outlined icon-ok-color">ballot</span>`;
  const inactiveVoterIcon = `<span class="material-symbols-outlined icon-no-color">close</span>`;

  const voterStatusIcon = voter["Voter Status"] == "A" ? activeVoterIcon : inactiveVoterIcon;

  return voterStatusIcon;
}

// Function to get the party for each voter
function getPartyColor(party) {
  const democratColor = "icon-democrat-color";
  const republicanColor = "icon-republican-color";
  const otherPartyColor = "icon-oth-party-color";

  let partyColor;
  switch(party) {
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
    // const voterId = voter["ID Number"];

    // Get voter status icon
    const voterStatusIcon = getVoterStatusIcon(voter);

    // Check canvassing status of this voter and get the icon
    const canvassStatusIcon = getCanvassStatusIcon(voter);

    // Check party affiliation
    const party = voter["Party Code"];
    const partyColor = getPartyColor(voter["Party Code"]);

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
function showHideExpandButton(innerSelector, outerSelector, buttonEl) {
  let voterListHeight = document.querySelector(innerSelector).offsetHeight;
  console.log("inner height is ", voterListHeight);
  let voterContainerHeight = document.querySelector(outerSelector).querySelector(".scroll-container").offsetHeight;
  console.log("outer height is ", voterContainerHeight);
  if(voterListHeight > voterContainerHeight){
    buttonEl.style.display = "block";
  } else {
    buttonEl.style.display = "none";
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
  listPrepare(voterListItemsEl);

  // Only show expand button when necessary
  showHideExpandButton("#voter-list", "#voter-list-component", voterListExpandButtonEl);

  // Scroll back to top
  let scrollContainer = document.querySelector("#voter-list-component").querySelector(".scroll-container");
  scrollContainer.scrollTop = 0;
}

export {
  showVotersInList,
  voterList,
  getPartyColor,
  showHideExpandButton,
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
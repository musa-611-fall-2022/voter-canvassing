/*
SHOW INFO WHEN A VOTER IS SELECTED
*/

import { data } from "./list-loader.js";
import electionLookup from "../data/election_lookup.js";
import { getPartyColor  } from "./voter-list.js";
import { htmlToElement } from './htmlelement.js';
import { showHideExpandButton  } from "./voter-list.js";
import { electionListExpandButtonEl } from "./list-expand.js";
import { highlightOption, prepareOption } from "./update-info.js";

const electionDict = electionLookup[0];

let basicInfoNameEl = document.querySelector(".info-panel-name");
let basicInfoAddressEl = document.querySelector(".info-panel-address");
let basicInfoPartyEl = document.querySelector(".info-panel-party");
let basicInfoCanvassStatusEl = document.querySelector(".info-panel-canvass-status");
let basicInfoVoterStatusEl = document.querySelector(".info-panel-voter-status");

let electionListEl = document.querySelector("#voting-history");

function displayName(thisVoter) {
  const name = `${thisVoter["First Name"]} ${thisVoter["Last Name"]}`;
  basicInfoNameEl.innerHTML = name;
}

function displayAddress(thisVoter) {
  const address = thisVoter.short_address;
  basicInfoAddressEl.innerHTML = address;
}

function displayParty(thisVoter) {
  const party = thisVoter["Party Code"];
  basicInfoPartyEl.innerHTML = party;
}

function displayCanvassStatus(thisVoter) {
  // Get the canvass state
  let thisStatus = "pending";
  if(thisVoter["canvass-status"]) {
    thisStatus = thisVoter["canvass-status"];
  }
  let optionIdSelector = `#icon-canvass-${thisStatus}`;

  // Store current voter id in the container DOM object
  document.querySelector("#icon-canvass").currentVoterId = thisVoter["ID Number"];

  // Highlight option
  highlightOption("#icon-canvass", optionIdSelector);

  // Prepare: add event listeners for them to be clicked on
  prepareOption("#icon-canvass");
}

function displayActiveness(thisVoter) {
  const active = thisVoter["Voter Status"];
  basicInfoVoterStatusEl.innerHTML = active;
}

// Function to construct an array sorted by date, with all the election info regarding this voter
function getVotingHistory(thisVoter) {
  // Initiate an array to store election info regarding a particular voter
  let thisVotingHistory = [];
  for(let i=1; i<=40; i++){
    // Get election info from dictionary
    let thisElection = electionDict[`Election ${i}`];

    if(thisElection) {
      let thisElectionName = thisElection.description.substring(5); // Name without year

      // Dates
      let thisElectionDate = thisElection.date;
      let thisElectionYear = thisElectionDate.substring(6);
      let thisElectionMonth = thisElectionDate.substring(0, 2);
      let thisElectionDay = thisElectionDate.substring(3, 5);
      // Concat dates for sorting
      let thisElectionDateCompare = thisElectionYear.concat(thisElectionMonth).concat(thisElectionDay);

      let thisElectionParty = thisVoter[`Election ${i} Party`];
      let thisElectionMethod = thisVoter[`Election ${i} Vote Method`];

      if(thisElectionParty) {
        thisVotingHistory.push({
          "name": thisElectionName,
          "date": thisElectionDate,
          "date-compare": thisElectionDateCompare,
          "party": thisElectionParty,
          "method": thisElectionMethod,
        });
      }
    }
  }
  return thisVotingHistory.sort((a, b) => (a["date-compare"] > b["date-compare"]) ? -1 : 1);
}

function displayVotingHistory(thisVoter) {
  let thisVotingHistory = getVotingHistory(thisVoter);

  // Initialize
  electionListEl.innerHTML = "";

  // Display preparation: all the HTML components
  for(let election of thisVotingHistory) {
    let thisYearMonth = `${election["date"].substring(0, 2)}/${election["date"].substring(6)}`;

    let thisNameHTML = `<div class="voting-history-item voting-history-name">${election["name"]}</div>`;
    let thisDateHTML = `<div class="voting-history-item voting-history-date">${thisYearMonth}</div>`;

    let partyColor = getPartyColor(election["party"]);
    let thisPartyHTML = `<div class="voting-history-item voting-history-party">
        <div class="list-icon ${partyColor}">${election["party"]}</div>
      </div>`;
    let thisMethodHTML = `<div class="voting-history-item voting-history-method">${election["method"]}</div>`;
    const electionItemEl = htmlToElement(`
        <li class="list-election">
          ${thisDateHTML} ${thisNameHTML} ${thisPartyHTML} ${thisMethodHTML}
        </li>
      `);
    electionListEl.append(electionItemEl);
  }

  // Only show button when necessary
  showHideExpandButton("#voting-history", "#edit-component", electionListExpandButtonEl);
}

function findThisVoter(thisId) {
  for(let voter of data) {
    if(voter["ID Number"] === thisId) {
      return(voter);
    }
  }
}

function displayInfo(thisId) {
  // Find this voter's data
  let thisVoter = findThisVoter(thisId);

  // Display in the basic info panel
  displayName(thisVoter);
  displayAddress(thisVoter);
  // displayActiveness(thisVoter);
  // displayParty(thisVoter);
  displayCanvassStatus(thisVoter);

  // Voting history part
  displayVotingHistory(thisVoter);
}

export {
  displayInfo,
  highlightOption,
};
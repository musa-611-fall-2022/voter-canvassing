/*
SHOW INFO WHEN A VOTER IS SELECTED
*/

import { data } from "./list-loader.js";
import electionLookup from "../data/election_lookup.js";
import { htmlToElement } from './htmlelement.js';
import { highlightOption, prepareOption, prepareInput } from "./update-info.js";
import partyLookup from '../data/political_party_lookup.js';
import { getPartyColor } from "./voter-list.js";

const electionDict = electionLookup[0];
const partyDict = partyLookup[0];
window.partyDict = partyDict;

let basicInfoNameEl = document.querySelector(".info-panel-name");
let basicInfoAddressEl = document.querySelector(".info-panel-address");

let electionListEl = document.querySelector("#voting-history");

/* BASIC INFO PANEL */

function displayName(thisVoter) {
  const name = `${thisVoter["First Name"]} ${thisVoter["Last Name"]}`;
  basicInfoNameEl.innerHTML = name;
}

function displayAddress(thisVoter) {
  const address = thisVoter.short_address;
  basicInfoAddressEl.innerHTML = address;

}

function displayParty(thisVoter) {
  const partyCode = thisVoter["Party Code"];
  const party = partyDict[partyCode];
  const partyCodeEl = document.querySelector("#info-panel-party-set").getElementsByClassName("list-icon")[0];
  partyCodeEl.innerHTML = partyCode;

  const partyColor = getPartyColor(partyCode);

  partyCodeEl.classList.remove(partyCodeEl.classList.item(1));
  partyCodeEl.classList.add(partyColor);

  const partyNameEl = document.querySelector("#info-panel-party-set").getElementsByClassName("icon-subtitle")[0];
  partyNameEl.innerHTML = party;
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
  const activeCode = thisVoter["Voter Status"];
  const activeName = activeCode == "A" ? "ACTIVE" : "INACTIVE";
  const activeCodeEl = document.querySelector("#info-panel-active-set").getElementsByClassName("list-icon")[0];
  const activeNameEl = document.querySelector("#info-panel-active-set").getElementsByClassName("icon-subtitle")[0];

  const activeVoterIcon = `<span class="material-symbols-outlined icon-ok-color">ballot</span>`;
  const inactiveVoterIcon = `<span class="material-symbols-outlined icon-no-color">close</span>`;
  const voterStatusIcon = activeCode == "A" ? activeVoterIcon : inactiveVoterIcon;


  activeCodeEl.innerHTML = voterStatusIcon;

  activeNameEl.innerHTML = activeName;
}

function displayMailGeneral(thisVoter) {
  // Get DOM objects
  const mailSet = document.querySelector("#info-panel-mail-set");
  mailSet.style.display = "none";

  const mailCodeEl = document.querySelector("#info-panel-mail-set").getElementsByClassName("list-icon")[0];
  const mailNameEl = document.querySelector("#info-panel-mail-set").getElementsByClassName("icon-subtitle")[0];


  // Construct some HTML elements
  const mailReceivedHTML = `<span class="material-symbols-outlined icon-ok-color">mark_email_read</span>`;
  const mailNotReceivedHTML = `<span class="material-symbols-outlined icon-no-color">unsubscribe</span>`;
  const voteInPersonHTML = `<span class="material-symbols-outlined icon-main-color">footprint</span>`;

  // Only display if such info exists
  if(thisVoter["mail"]) {
    // Only show if there's this thing
    mailSet.style.display = "flex";

    let mailBallotInfo = thisVoter["mail"];
    if(mailBallotInfo === "received") {
      mailCodeEl.innerHTML = mailReceivedHTML;
      mailNameEl.innerHTML = "Received mail ballot";
    } else if(mailBallotInfo === "awaits") {
      mailCodeEl.innerHTML = mailNotReceivedHTML;
      mailNameEl.innerHTML = "Awaits mail ballot";
    } else {
      mailCodeEl.innerHTML = voteInPersonHTML;
      mailNameEl.innerHTML = "Will vote in person";
    }
  }
}

function displayPlanGeneral(thisVoter) {
  // Get DOM objects
  const planSet = document.querySelector("#info-panel-plan-set");
  planSet.style.display = "none";

  const planCodeEl = document.querySelector("#info-panel-plan-set").getElementsByClassName("list-icon")[0];
  const planNameEl = document.querySelector("#info-panel-plan-set").getElementsByClassName("icon-subtitle")[0];

  // Construct some HTML elements
  const planYes = `<span class="material-symbols-outlined icon-ok-color">task_alt</span>`;
  const planNo = `<span class="material-symbols-outlined icon-no-color">unpublished</span>`;

  // Only display if such info exists
  if(thisVoter["plan"]) {
    // Only show if there's this thing
    planSet.style.display = "flex";

    let planInfo = thisVoter["plan"];
    if(planInfo === "yes") {
      planCodeEl.innerHTML = planYes;
      planNameEl.innerHTML = "Planned";
    } else {
      planCodeEl.innerHTML = planNo;
      planNameEl.innerHTML = "Not planned";
    }
  }
}

/* VOTING HISTORY */

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

// Voting history on the second panel
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
  // showHideExpandButton("#voting-history", "#voting-history-container", electionListExpandButtonEl);
}

/* PER CANVASSING RECORD */

// Display options for Voter Language
function displayLanguageOptions(thisVoter) {
  let langInput = document.querySelector("#icon-lang-input").getElementsByTagName("input")[0];
  langInput.placeholder = "Other...";
  // Get the canvass state
  let thisStatus = undefined;
  // Store current voter id in the container DOM object
  // Do this because we have to store the info associated with the voter
  document.querySelector("#icon-lang").currentVoterId = thisVoter["ID Number"];

  thisStatus = thisVoter["language"];
  let optionIdSelector = `#icon-lang-${thisStatus}`;
  // Highlight option (thisStatus undefined situation dealt with there)
  highlightOption("#icon-lang", optionIdSelector);

  // If not the three languages, show in the input box
  if(thisStatus != undefined && !["english", "spanish", "chinese"].includes(thisStatus)) {
    langInput.placeholder = thisStatus;
  }

  // Prepare: add event listeners for them to be clicked on
  prepareOption("#icon-lang");
  prepareInput("#icon-lang");
}

// Display options for Voter Plan
function displayPlanOptions(thisVoter) {

  // Get the canvass state
  let thisStatus = undefined;
  // Store current voter id in the container DOM object
  // Do this because we have to store the info associated with the voter
  document.querySelector("#icon-plan").currentVoterId = thisVoter["ID Number"];

  thisStatus = thisVoter["plan"];
  let optionIdSelector = `#icon-plan-${thisStatus}`;

  // Highlight option (thisStatus undefined situation dealt with there)
  highlightOption("#icon-plan", optionIdSelector);

  // Prepare: add event listeners for them to be clicked on
  prepareOption("#icon-plan");
}

// Display options for Voter mailing option
function displayMailOptions(thisVoter) {

  // Get the canvass state
  let thisStatus = undefined;
  // Store current voter id in the container DOM object
  // Do this because we have to store the info associated with the voter
  document.querySelector("#icon-mail").currentVoterId = thisVoter["ID Number"];

  thisStatus = thisVoter["mail"];
  let optionIdSelector = `#icon-mail-${thisStatus}`;

  // Highlight option (thisStatus undefined situation dealt with there)
  highlightOption("#icon-mail", optionIdSelector);

  // Prepare: add event listeners for them to be clicked on
  prepareOption("#icon-mail");
}

// Display options for Voter Language
function displayWhoOptions(thisVoter) {
  let whoInput = document.querySelector("#icon-who-input").getElementsByTagName("input")[0];
  whoInput.placeholder = "Other...";

  // Get the canvass state
  let thisStatus = undefined;
  // Store current voter id in the container DOM object
  // Do this because we have to store the info associated with the voter
  document.querySelector("#icon-who").currentVoterId = thisVoter["ID Number"];

  thisStatus = thisVoter["who"];
  let optionIdSelector = `#icon-who-${thisStatus}`;
  // Highlight option (thisStatus undefined situation dealt with there)
  highlightOption("#icon-who", optionIdSelector);

  // If not the two parties, show in the input box
  if(thisStatus != undefined && !["d", "r"].includes(thisStatus)) {
    whoInput.placeholder = thisStatus;
  }

  // Prepare: add event listeners for them to be clicked on
  prepareOption("#icon-who");
  prepareInput("#icon-who");
}

// Display extra notes
function displayExtraNotes(thisVoter) {
  let extraNotesEl = document.querySelector("#other-notes-input").getElementsByTagName("input")[0];
  if(thisVoter["notes"]) {
    extraNotesEl.placeholder = thisVoter["notes"];
  }
}

/* UTIL: FIND THE VOTER DATA ENTRY USING VOTER ID */

// Find voter: takes voter ID and outputs comprehensive voter data
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
  displayActiveness(thisVoter);
  displayParty(thisVoter);
  displayCanvassStatus(thisVoter);
  displayMailGeneral(thisVoter);
  displayPlanGeneral(thisVoter);

  // Voting history part
  displayVotingHistory(thisVoter);

  // Canvass recording part
  displayLanguageOptions(thisVoter);
  displayPlanOptions(thisVoter);
  displayMailOptions(thisVoter);
  displayWhoOptions(thisVoter);

  // Show notes if any
  displayExtraNotes(thisVoter);
}

export {
  displayInfo,
  highlightOption,
  displayPlanGeneral,
  displayMailGeneral,
  findThisVoter,
};
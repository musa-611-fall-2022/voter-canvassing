/*
SHOW INFO WHEN A VOTER IS SELECTED
*/

import { data } from "./list-loader.js";

let basicInfoNameEl = document.querySelector(".info-panel-name");
let basicInfoAddressEl = document.querySelector(".info-panel-address");
let basicInfoPartyEl = document.querySelector(".info-panel-party");

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

function findThisVoter(thisId) {
  for(let voter of data) {
    if(voter["ID Number"] === thisId) {
      return(voter);
    }
  }
}

function displayInfo(thisId) {
  let thisVoter = findThisVoter(thisId);
  displayName(thisVoter);
  displayAddress(thisVoter);
  displayParty(thisVoter);
}

export {
  displayInfo,
};
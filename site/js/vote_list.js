let voterList = document.querySelector('#voterlist');
window.voterList = voterList;
export let voterListItemsEl;

import { htmlToElement } from './tools.js';

// add voters to short address
function groupbykey(data,key){
let datagroupbyaddress=data.reduce((grouped, thisItem) => {
    let thisCategory = thisItem[key];
    grouped[thisCategory] = grouped[thisCategory] || []; // Initialize if not existing
    grouped[thisCategory].push(thisItem);
    return grouped;
  }, {});

  return datagroupbyaddress;
}


//show the address, and the voters are grouped by their addresses
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

  function addVotersByAddress(votersByThisAddress) {
    for(const voter of votersByThisAddress) {
  
      // Get current voter ID
      // const voterId = voter["ID Number"];
  
      // Get voter status icon
      //const voterStatusIcon = getVoterStatusIcon(voter);
  
      // Check canvassing status of this voter and get the icon
      //const canvassStatusIcon = getCanvassStatusIcon(voter);
  
      // Check party affiliation
      //const party = voter["Party Code"];
      //const partyColor = getPartyColor(voter["Party Code"]);
  
      const voterEl = htmlToElement(`
        <li class="list-voter" value=0 title="${voter["ID Number"]}">
          <div class="list-name">${voter["First Name"]} ${voter["Last Name"]}</div>
          
        </li>
      `);
      voterList.append(voterEl);
    }
  }

function showvotersinlist(data){
     voterList.innerHTML='';
     let dataGroupedByAddress = groupbykey(data, "short_address");
     let addressKeys = Object.keys(dataGroupedByAddress);
     for(const address of addressKeys) {
        addAddressToList(address);
        let votersByThisAddress = dataGroupedByAddress[address];
        addVotersByAddress(votersByThisAddress);
      }
      voterListItemsEl = document.querySelectorAll(".list-voter");
      listPrepare(voterListItemsEl);

     let scrollContainer = document.querySelector("#voterlistcomponent").querySelector(".scoll_container");
  scrollContainer.scrollTop = 0;
}

export {
    showvotersinlist,
    voterList,
  };
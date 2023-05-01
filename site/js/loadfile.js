
let voterFileInput = document.querySelector('#list-name-input');
window.voterFileInput = voterFileInput;
let voterFileLoadButton=document.querySelector('#input-button');
window.voterFileLoadButton = voterFileLoadButton;
let tooltip=document.querySelector("#input-button").querySelector(".tooltiptext");
window.tooltip = tooltip;


export let inputnumber;
export let data;
import { showvotersinlist }  from './vote_list.js';
import { showVotersOnMap }  from './vote-map.js';
import { updateAdditionalInfo } from "./main.js";


export let additionalData = {
  info: null,
};

// Function to change button tooltip depending on input
function errorTooltip(inputNumber) {
  let interrupt = false;
  if(inputNumber.length == 0) {
    tooltip.innerHTML = `<div class="tooltip-content">Empty input</div>`;
    interrupt = true;
  } else if(inputNumber.length != 4) {
    tooltip.innerHTML = `<div class="tooltip-content">Wrong digits</div>`;
    interrupt = true;
  }
  return interrupt;
}

function checkFetchStatus(resp) {
  if(resp.ok) {
    return resp.text();
  } else {
      // If the file doesn't exist, then show in tooltip
      tooltip.innerHTML = `<div class="tooltip-content">Wrong number</div>`;
      return false;
  }
}


//make a feature named "short address" to each voter and combine house number with street name
function basicaddress(data){
  for (let voter of data){
    voter["short_address"]=voter["House Number"] + voter["Street Name"];
  }
  return (data);
}


function loadvoterdata(text){
  if(text==false){
    return;
  }
  // Papa Parse is reading the last line of each csv as a person
// skipemptylines:true is to clean the csv
data = {};
data = Papa.parse(text, { header: true, skipEmptyLines: true }).data;

//updateAdditionalInfo(inputnumber, data, showvotersinlist);

data = basicaddress(data);
updateAdditionalInfo(inputnumber, data, showvotersinlist, showVotersOnMap);

window.data=data;
}



//what will happen when click the botton
//fetch the file and check the fetch path
function loadbynumber(number) {
  inputnumber=number;
let path='../data/voters_lists/' + number + '.csv'; 
voterFileInput.placeholder='${number}';

fetch(path)
    .then(checkFetchStatus)
    .then(loadvoterdata);
}


//read the list number and the the input
function onbuttonClicked(){
  inputnumber=voterFileInput.value.replace(/\s/g, '');
  if(errorTooltip(inputnumber)){
    return
  }
  loadbynumber(inputnumber);
}

 voterFileLoadButton.addEventListener("click", onbuttonClicked);





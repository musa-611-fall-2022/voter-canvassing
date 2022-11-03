// // // add event listener to search box
// function onSearchBoxInput() {
//   showVotersInList();
// }

import { data } from './list-loader.js';
import { showVotersInList }  from './voter-list.js';
import { voterList } from './voter-list.js';

// TEST
// let testEl = document.querySelector("#list-filter-component");
// let thisListData;

// testEl.addEventListener("click", ( ) => {
//   let listFromStorage = localStorage.getItem("thisList");
//   thisListData = JSON.parse(listFromStorage || "{}");
//   console.log(data);
// });
// END TEST

let voterInputBox = document.querySelector('#search-box-input');

function onSearchBoxInput(data) {
  let filteredVoter = data;
  const text = voterInputBox.value.toLowerCase();
  filteredVoter = filteredVoter.filter(function(voter) {
        const firstName = voter['First Name'].toLowerCase();
        const lastName = voter['Last Name'].toLowerCase();
        const hasText = firstName.includes(text) || lastName.includes(text);
        return hasText;
      });
      return filteredVoter;
}

voterInputBox.addEventListener("input", ( ) => {
  const filteredVoter = onSearchBoxInput(data);
  showVotersInList(filteredVoter, voterList);
});

// notes with mjumbe
// papa parse is reading the last line of each csv as a person
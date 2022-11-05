import { data } from './list-loader.js';
import { showVotersInList }  from './voter-list.js';
import { voterList } from './voter-list.js';

let voterInputBoxEl = document.querySelector('#search-box-input');

// Filter by the input of search box
// Search by first name or last name
function filterByName() {
  let filteredVoter = data;
  const inputText = voterInputBoxEl.value.toLowerCase();

  filteredVoter = filteredVoter.filter(function(voter) {
    const firstName = voter['First Name'].toLowerCase();
    const lastName = voter['Last Name'].toLowerCase();
    const hasInputText = firstName.includes(inputText) || lastName.includes(inputText);
    return hasInputText;
  });
  return filteredVoter;
}

// What happens when searchbox has input
function onSearchBoxInput() {
  const filteredVoter = filterByName();
  showVotersInList(filteredVoter, voterList);
}

voterInputBoxEl.addEventListener("input", onSearchBoxInput);

// notes with mjumbe
// papa parse is reading the last line of each csv as a person
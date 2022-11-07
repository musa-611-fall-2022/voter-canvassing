import { data } from './list-loader.js';
import { showVotersInList }  from './voter-list.js';

export let voterInputBoxEl = document.querySelector('#search-box-input');

// Step in filter by search box; match if an individual voter fulfills the filter
function matchInput(voter, inputText) {

  // Split the input text into individual words
  const keyWords = inputText.split(" ").map(s => s.replace(/\s/g, ""));

  // Match with first name, last name, and short address
  const firstName = voter['First Name'].toLowerCase();
  const lastName = voter['Last Name'].toLowerCase();
  const shortAddress = voter["short_address"].toLowerCase();

  // Rule 1: each word should be matched
  // Rule 2: either match with first name, or last name, or address
  let includesKeyword = keyWords.map(word => {
    let eachWordMatch = firstName.includes(word) || lastName.includes(word) || shortAddress.includes(word);
    return eachWordMatch;
  });
  return !includesKeyword.includes(false);
}

// Filter by the input of search box
// Search by first name or last name or short address
function filterByNameAddress(data) {
  let filteredVoter = data;
  const inputText = voterInputBoxEl.value.toLowerCase();

  filteredVoter = filteredVoter.filter((voter) => {
    let isMatched = matchInput(voter, inputText);
    return isMatched;
  });
  return filteredVoter;
}

// What happens when searchbox has input
function onSearchBoxInput() {
  const filteredData = filterByNameAddress(data);
  showVotersInList(filteredData);
}

//voterInputBoxEl.addEventListener("input", onSearchBoxInput);

export {
  onSearchBoxInput,
  filterByNameAddress,
};
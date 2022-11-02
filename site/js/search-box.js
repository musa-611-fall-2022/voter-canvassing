// // // add event listener to search box
// function onSearchBoxInput() {
//   showVotersInList();
// }

// import { data } from './list-loader.js';
import { showVotersInList }  from './voter-list.js';
import { voterList } from './voter-list.js';

let voterNameFilter = document.querySelector('#search-box-input');

function onSearchBoxInput(data) {
  let filteredVoter = data;
  const text = voterNameFilter.value;
  filteredVoter = filteredVoter.filter(function(voter) {
        const name = voter['First Name'].toLowerCase();
        const hasText = name.includes(text);
        return hasText;
      });
      return filteredVoter;
}
voterNameFilter.addEventListener('input', () => {
  const filteredVoter = onSearchBoxInput();
  showVotersInList(filteredVoter, voterList);
});


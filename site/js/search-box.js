// // add event listener to search box
// import voters from '../data/list-loader.js';
// import { showVotersInList } from './voter-list';
// import { voterList } from './voter-list';

// let voterNameFilter = document.querySelector('#search-box-input');

// // function onSearchBoxInput() {
// //   showVotersInList();
// // }

// function onSearchBoxInput() {
//   // showVotersInList();
//   let filteredVoter = voters;
//   const text = voterNameFilter.value;
//   filteredVoter = filteredVoter.filter(function(voter) {
//         const name = voter['First Name'].toLowerCase();
//         const hasText = name.includes(text);
//         return hasText;
//       });
//       return filteredVoter;
// }

// voterNameFilter.addEventListener('input', () => {
//   const filteredVoter = onSearchBoxInput();
//   showVotersInList(filteredVoter, voterList);
// });
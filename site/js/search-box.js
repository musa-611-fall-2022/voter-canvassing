// // // add event listener to search box
// // import data from '../data/list-loader.js';
// import { showVotersInList } from './voter-list';
// import { voterList } from './voter-list';

// let voterNameFilter = document.querySelector('#search-box-input');
// let filteredVoter = data
// // // function onSearchBoxInput() {
// // //   showVotersInList();
// // // }

// // function onSearchBoxInput(data) {
// //   // showVotersInList();
// //   let filteredVoter = data;
// //   const text = voterNameFilter.value;
// //   filteredVoter = filteredVoter.filter(function(voter) {
// //         const name = voter['First Name'].toLowerCase();
// //         const hasText = name.includes(text);
// //         return hasText;
// //       });
// //       return filteredVoter;
// // }

// function onSearchBoxInput() {
//   showVotersInList(filteredVoter, voterList);
// }

// // voterNameFilter.addEventListener('input', () => {
// //   const filteredVoter = onSearchBoxInput();
// //   showVotersInList(filteredVoter, voterList);
// // });
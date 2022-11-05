// function showVotersInList(data) {
//   ;
//   // Should add event listener on every voter in the list
//   // Use something to store the id of the selected voter
// }

import { htmlToElement } from './htmlelement.js';

let voterList = document.querySelector('#voter-list');

function showVotersInList(data) {
  voterList.innerHTML = '';

  for (const voter of data) {
    const space = ' ';
    const html = `
          <li class="voter-name-list">${voter['First Name'] + space + voter['Last Name']}</li>
          `;
      const li = htmlToElement(html);
      voterList.append(li);
  }
}

export {
  showVotersInList,
  voterList,
};

/*
Requirement:
The list's DOM element should be available on the global
*/

window.voterList = voterList;
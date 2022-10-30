// function showVotersInList(data) {
//   ;
//   // Should add event listener on every voter in the list
//   // Use something to store the id of the selected voter
// }

import { htmlToElement } from './htmlelement.js';

let voterList = document.querySelector('#voter-list');

function showVotersInList(data) {
  voterList.innerHTML = '';

  for (const voters of data) {
    const html = `
          <li class="voter-list-component>${voters['first_name']}</li>
          `;
      const li = htmlToElement(html);
      voterList.append(li);
  }
}

export {
  showVotersInList,
};
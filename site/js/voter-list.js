import { htmlToElement } from './template-tools.js';
import { searchNeighbor } from './map.js';

function showVoterInList(stopsToShow, stopList) {
  stopList.innerHTML = '';

  for (const stop of stopsToShow) {
    const html = `
      <li class="stop-list-item">${stop['3']} ${stop['4']} </li>
    `;
    const li = htmlToElement(html);
    stopList.append(li);
  }
}

export {
    showVoterInList,
};
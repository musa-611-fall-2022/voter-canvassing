import { htmlToElement } from './template-tools.js';

function showVotersInList(voters, voterList) {
    voterList.innerHTML = '';
    for (const voter of voters) {
        const html = `
            <a href="#" class="list-group-item list-group-item-action">${voter}</a>
      ` ;
        const li = htmlToElement(html);
        voterList.append(li);
    }
}


export {
    showVotersInList,
};
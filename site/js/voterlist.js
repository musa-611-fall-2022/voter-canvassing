import { htmlToElement } from "./template-tools.js";

function populateVoterMenu(voterList, voterListObj) {
    voterListObj.innerHTML = ``;
    for (let address of voterList) {

        let voterHTML = ``;
        for (let voter of address['voters']) {
            voterHTML = voterHTML + `<span class="voter-name">${voter['firstName']} ${voter['lastName']}</span>`;
        }

        const html = `
        <span class="voter-list-item">
            <span class="voter-address">${address.properties['address']}</span>
            ${voterHTML}
        </span>
        `;
        const li = htmlToElement(html);
        voterListObj.append(li);
    }
}

export {
    populateVoterMenu,
};
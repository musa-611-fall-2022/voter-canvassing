import { htmlToElement } from "./template-tools.js";

function populateVoterMenu(voterList, voterListObj) {
    voterListObj.innerHTML = ``;

    if (myLocation) { // if we have user's location, sort the list by how close the houses are to the user at that moment before populating list
        for (let voter of voterList) {
            voter.properties.distToMe = (Math.abs(voter.geometry.coordinates[0] - myLocation.coordinates[0]) +
                                         Math.abs(voter.geometry.coordinates[1] - myLocation.coordinates[1]));
        }
        voterList.sort(function (a, b) {b.properties.distToMe - a.properties.distToMe});
    }


    for (let voter of voterList) {
        const html = `
        <li class="voter-list-item">Name: ${voter.properties['firstName']} ${voter.properties['lastName']} Address: ${voter.properties['address']}</li>
        `;
        const li = htmlToElement(html);
        voterListObj.append(li);
    }
}

export {
    populateVoterMenu,
};
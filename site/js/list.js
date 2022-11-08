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

        //TODO: figure out how to format span objects for voters in CSS

        const html = `
        <span class="voter-list-item">
            <span class="voter-name">${voter.properties['firstName']} ${voter.properties['lastName']}</span>
            <span class="voter-address">${voter.properties['address']}</span>
        </span>
        `;
        const li = htmlToElement(html);
        voterListObj.append(li);
    }
}

export {
    populateVoterMenu,
};
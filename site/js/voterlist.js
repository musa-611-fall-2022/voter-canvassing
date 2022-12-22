import { htmlToElement } from "./template-tools.js";



function voterMenuList(voterList, voterListObj) {
    voterListObj.innerHTML = '';

    for (let v of voterList) {

        const html = `
        <li class="voter-name"> Name : ${v['First Name']} ${v['Last Name']}. <br>
        Address: ${v['TIGER/Line Matched Address']}<br></li>
        `;

        const li = htmlToElement(html);
        voterListObj.append(li);
    }
}

export {
    voterMenuList,
};


/*import { htmlToElement } from "./template-tools.js";

function showSchoolsInList(schoolsToShow, schoolList) {
    schoolList.innerHTML = '';

    for (const school of schoolsToShow) {
        const html = `
            <li class="school-list-item">${school['name']}. School Level: ${school['School Level']}</li>
        `;
        const li = htmlToElement(html);
        schoolList.append(li);
    }
}

export {
    showSchoolsInList,
};*/
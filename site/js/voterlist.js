
import { htmlToElement } from "./template-tools.js";
let voterList;
function votersinlist(data_json, voterList) {
    //voterList.innerHTML = ;
    //let voterHTML = ``;
  for (const voter of data_json) {
    {
        const html = `
        <span class="voter-list-item">${data_json['First Name']}</span>
        `;
        const li = htmlToElement(html);
        voterList.append(li);}
        //console.log(voterList);
}
}

export {
    votersinlist,
};

window.votersinlist = votersinlist;
window.voterList = voterList;
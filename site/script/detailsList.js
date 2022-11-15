import { compileName, compileAddress, showAddressesInList } from './addressList.js';


function showDetails(data, id, panel) {
    panel.innerHTML = "";

    panel.classList.add("voter-details-container")
    
    //compile voters
    const voters = [];
    let count = 1;
    let pastTalks = "No past conversations.";

    const headerHTML = `<div id=detailsHeader_${id} class="voter-details-header"><h3>${id}</h3></div>`
    const li = htmlToElement(headerHTML);
    panel.append(li)
    panel.parentNode.scrollTop = 0;

    //loop through data to find particular voters associated with active address
    for (let person of data["features"]) {
        //get each voter associated with that specific address
        const resultAddress = compileAddress(person)
        if (resultAddress == id) {
            //add them to voter array, following consistent format
            const voter = {
                id: count,
                voterID: person.properties["ID Number"],
                name: compileName(person),
                age: 0,
                registered: registered(person),
                party: person.properties["Party Code"]
            }
            voters.push(voter);
            count++;
        }
    }
    
    //list voters in form from voters array
    for (let person of voters){
        let html = `
        <div id="voter${person.id}" class ="voter-details">
            <p>Voter ${person.id}</p>
            <h4>${person.name}</h4>
            <p> Age: ${person.age}</p>
            <p><span>${person.registered}</span></p>
            <p>Party: ${person.party}</p>
            <p>Prefered: N/A</p>
            <h5 >Past Conversations</h5>
            <p id="pastTalks_${person.voterID}" class="details-subheader">${[pastTalks]}</p>
            <h5 class="details-subheader">Voting Plan:</h5>
            <p id="votingPlan_${person.voterID}">Not yet added.</p>
            <button id="votingPlanBtn_${person.voterID}">Edit Voting Plan</button>
            <hr class="detailEntrySeparator"/>
        </div>`

        //add html to the addressList div
        const li = htmlToElement(html);
        panel.append(li);
       

        //add event listener to the voting plan button
        let button = document.getElementById(`votingPlanBtn_${person.voterID}`)
        button.addEventListener('click', onButtonClicked); //add clicking event listener
    }
    
};

function showBackButton(){

}

function onButtonClicked(){
console.log("Button was clicked")
}

//determine whether the person is active or inactive
function registered(x){
    if (x.properties["Voter Status"] == "A"){
        return "Active Registration";
    } else if (x.properties["Voter Status"] == "I"){
        return "Inactive Registration";
    } else {
        return "Unknown Registration"
    }
}

export {
    showDetails,
};


//     <div id=voterDetailsHeader class="voter-details-header">
//     <div id="voterX" class ="voter-details">
//         <p>voter X</p>
//         <h4>Name</h4>
//         <p>age</p>
//         <p><span>registration</span></p>
//         <p>party</p>
//         <p>Prefers Language</p>
//         <h5 id="pastConversationsX" class="past-conversations">Past Conversations</h5>
//         <p></p>
//         <h5 id="Header" class="voting-plan">Voting Plan:</h5>
//         <p id="votingPlan">Not yet added.</p>
//         <btn id="votingPlanBtnX">Edit Voting Plan</btn>
//         <hr class="detailEntrySeparator"/>
//     </div>
// </div>

// <form class="voter-details">
//     <div></div>
// </form>
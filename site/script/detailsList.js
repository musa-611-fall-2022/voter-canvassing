import { compileName, compileAddress } from './addressList.js';


function showDetails(data, id, panel) {
    //compile voters
    const voters = [];
    let count = 0;
    let pastTalks = "No past conversations.";

    //loop through data to find particular voters associated with active address
    for (person in data) {
        //get each voter associated with that specific address
        resultAddress = compileAddress(person)
        if (resultAddress == id) {
            //add them to voter array, following consistent format
            voter = {
                id: count,
                voterId: person.properties["ID Number"],
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
    for (person in voters){
        let html = `
        <div id="voter${person.id}" class ="voter-details">
            <p>Voter ${person.id}</p>
            <h4>${person.name}</h4>
            <p>${person.age}</p>
            <p><span>${person.registered}</span></p>
            <p>${person.party}</p>
            <p>Prefered: N/A</p>
            <h5 >Past Conversations</h5>
            <p id="pastTalks_${voterID}" class="details-subheader">${pastTalks}</p>
            <h5 class="details-subheader">Voting Plan:</h5>
            <p id="votingPlan_${voterID}">Not yet added.</p>
            <btn id="votingPlanBtn_${voterID}">Edit Voting Plan</btn>
            <hr class="detailEntrySeparator"/>
        </div>`

        //add html to 
        const li = htmlToElement(html);
        panel.append(li);

        //add event listener to button
        let button = document.getElementById(`votingPlan_${voterID}`)
        button.addEventListener('click', onButtonClicked); //add clicking event listener
    }

  

    const headerHTML = `<div id>${id}</div>`
    const li = htmlToElement(html);
    panel.append(li)
    
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
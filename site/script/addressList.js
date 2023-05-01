import { htmlToElement } from './template-tools.js';
import { showDetails } from './detailsList.js';

function onAddressClicked(evt) {
    const home = evt.target.id;
    const addressSelectedEvent = new CustomEvent('address-selected', { detail: { home } });
    window.dispatchEvent(addressSelectedEvent);

}

function showAddressesInList(addresses) {
    const addressList = document.getElementById("addressList");
    addressList.innerHTML = '';

    //additional variables
    const voters = []; //array for a list voters at each residence
    let count = 0; //counting var to total residences as we go, then add later
    let added = []; //checking whether something already is in the list

    for (const address of addresses["features"]) {
        if (address !== undefined) {

            //specify the full address and save it for checking whether others live there
            let fullAddress = compileAddress(address);

            //if it hasn't been added
            if (added.indexOf(fullAddress) === -1){

                //replaced name concatenation with function, used in other modules
                let Name = compileName(address);
                let id = fullAddress;

                added.push(fullAddress);
                count++; //add to count for the total number of residences

                //clear array, then add voter name to the array
                voters.length = 0;
                voters.push(Name);

                //looping through to check for other matches
                for (const x of addresses["features"]){
                    //check if the address comes up again
                    if (compileAddress(x) == fullAddress && voters.indexOf(compileName(x)) == -1){
                        Name = compileName(x);
                        voters.push(Name); //add name to array
                    }
                }

                //add text to the element and append it to the list
                const html = `
                <a href="#" class="list-group-item list-group-item-action" id="${id}">
                    <h4>${fullAddress}</h4>
                    <p>${typeOfHouse(address)} - ${voters.length} Voter(s)</p>
                    <p>${listHouseVoters(voters)}</p>
                </a>` ;
                const li = htmlToElement(html);
                addressList.append(li);
                li.addEventListener('click', onAddressClicked); //add clicking event listener
            }

        }


    }

    //add the residence total to the top of the address list
    const html = `
    <a href="#" class="list-group-item list-group-item-action"">
        Residences Shown: ${count}
    </a>`;
    const li = htmlToElement(html);
    addressList.insertBefore(li, addressList.firstChild);
}

function compileName(data){
    if (data.properties["Suffix"] == ""){
        return `${data["properties"]["First Name"]} ${data["properties"]["Last Name"]}`;
    } else {
        return `${data["properties"]["First Name"]} ${data["properties"]["Last Name"]} ${data["properties"]["Suffix"]}`;
    }
}

//check if there is an apartment number in the line and assign type based on result
function typeOfHouse(address){
    let string = "";
    if (address.properties['Apartment Number'] != ''){
        string = "Apartment";
    } else {
        string = "House";
    }
    return string;
}

//reduce function to concatenate all the voters at a single address into one string
function listHouseVoters(array){
    let string = "";
    if (array.length > 1) {
    string = array.reduce((x, y) => x + "<br>" + y);
    } else {
    string = array[0]; //adding exception for the case where there is only one name, so no <br> tag
    }
    return string;
}

//compile addresses from the file properties. Eliminates extra spaces
function compileAddress(data){
    if (data.properties['House Number Suffix'] == ""
    && data.properties['Apartment Number'] == ""
    && data.properties['Address Line 2'] == ""){
        //Base case
        return `${data.properties['House Number']} ${data.properties['Street Name']}`;
    } else if (data.properties['House Number Suffix'] == ""
    && data.properties['Address Line 2'] == "") {
        //Apartments, no address line 2
        return `${data.properties['House Number']} ${data.properties['Street Name']} ${data.properties['Apartment Number']}`;
    } else if (data.properties['Address Line 2'] == ""
    && data.properties['Apartment Number'] == "") {
        //House number suffix
        return `${data.properties['House Number']} ${data.properties['House Number Suffix']} ${data.properties['Street Name']} `;
    } else if (data.properties['House Number Suffix'] == ""){
        //Apartment Number and Address Line 2. Later because this search term is more general.
        return `${data.properties['House Number']} ${data.properties['Street Name']} ${data.properties['Apartment Number']} ${data.properties['Address Line 2']}`;
    } else {
        //catch all
        return `${data.properties['House Number']} ${data.properties['House Number Suffix']} ${data.properties['Street Name']} ${data.properties['Apartment Number']} ${data.properties['Address Line 2']}`;
    }
}

export {
    showAddressesInList,
    compileAddress,
    compileName,
};
import { htmlToElement } from './template-tools.js';

function showAddressesInList(addresses, addressList) {
    addressList.innerHTML = '';
    console.log(addressList.innerHTML)
    console.log(addresses)
    let length = addresses["features"].length;
    const html = `
        <a href="#" class="list-group-item list-group-item-action"">
            Total Addresses Number: ${length}
        </a>
  ` ;
    const li = htmlToElement(html);
    addressList.append(li);
    for (const address of addresses["features"]) {
        if (address !== undefined) {
            let streetName = address["properties"]["Street Name"];
            let firstName = address["properties"]["First Name"];
            let lastName = address["properties"]["Last Name"];
            let Name = firstName + lastName;
            const html = `
                <a href="#" class="list-group-item list-group-item-action"">
                    Street Name : ${streetName}
                    <br>
                    Voter Name : ${Name}
                </a>
          ` ;
            const li = htmlToElement(html);
            addressList.append(li);
        }
    }
}


export {
    showAddressesInList,
};
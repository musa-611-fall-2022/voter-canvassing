import{htmlToElement} from './template-tools.js';

function ShowVotersList(votersToShow,onFailure) {

    fetch(`./data/voters_lists/${votersToShow}.csv`)
    .then(response => {
        if (response.status === 200) {
        const data = response.text();
        return data;
        } else {
        alert('Oh no, I failed to download the data.');
        if (onFailure) { onFailure() }
        }
    })
    .then(v => Papa.parse(v, { delimiter:"," }))
    .catch(err => console.log(err))
    .then(result => {
        let v = result.data.slice(1, result.data.length-1);
        return v;
        
    })
    
    //now we have many voters of certain list.no in a json format

    .then(result =>{
        let D=result.map(showlist)
    return D;}
        )
}

        //display voter's name and ID 
function showlist(votersToShow) {
    
        const html = `
        <li class="voter-list-item">${votersToShow['name']} (id: ${votersToShow['ID Number']})</li>
        `;
        
    
}


export{
    ShowVotersList,
};
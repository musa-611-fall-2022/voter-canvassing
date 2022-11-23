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
        
        //now we have many voters of certain list.no in a json format
        for (const voter in result){
            const html = `
        <li class="voter-list-item">${voter['name']} (id: ${voter['ID Number']})</li>
        `;
        const li = htmlToElement(html);
        }//display voter's name and ID 
    }
    )
    
    
    
}


    


export{
    ShowVotersList,
};
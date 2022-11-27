import{htmlToElement} from './template-tools.js';

function ShowVotersList(votersToShow,onFailure) {

    fetch(`data/voters_lists/${votersToShow}.csv`)
    .then(resp => {
        if (resp.status === 404) {
          alert(`No list "${precinct}" is available.`)
          throw new Error(`No data file for list "${precinct}"`)
        }
        return resp
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
        List.innerHTML='';
        const html = `
        <li class="voter-list-item">${votersToShow['name']} (id: ${votersToShow['ID Number']})</li>
        `;
        const li = htmlToElement(html);
        List.append(li);
    
}


export{
    ShowVotersList,
};
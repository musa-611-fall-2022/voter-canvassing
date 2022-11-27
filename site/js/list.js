import{htmlToElement} from './template-tools.js';

function ShowVotersList(votersToShow,onFailure) {
    //let votersToShow1 = votersToShow.value;
    fetch(`data/voters_lists/${votersToShow}.csv`)

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
    const resultItem = document.createElement('li')
    resultItem.classList.add('result-item')
    const text = document.createTextNode(votersToShow.name)
    resultItem.appendChild(text)
    list.appendChild(resultItem)
}


export{
    ShowVotersList,
};
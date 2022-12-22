function saveNote(voterID, content, app){
    app.notes[voterID] = content;

    localStorage.setItem('notes', JSON.stringify(app.notes));
}

function loadNotes(onSuccess, onFailure){
    try{
        const notes = JSON.parse(localStorage.getItem('notes'));
        onSuccess(notes);
    } catch {
        alert('Oh no, We failed');
        if (onFailure) {onFailure()}
    }
   

}

export{
    saveNote,
    loadNotes,
}
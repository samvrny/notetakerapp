const express = require('express');
const {notes} = require('./db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//this function creates the new note and adds is to db.json
function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
    return newNote;
}

//this function deletes a note and rewrites the db.json file so each object within has the correct id
function deleteNoteById(id, notes) {
    const thisId = id;
    console.log(thisId);
    notes.splice(thisId, 1)
    for(i = 0; i < notes.length; i++) {
        notes[i].id = "" + i + "";
    }
    console.table(notes);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notes}, null, 2)
    );
    return notes;
}

//below are the get, post, and delete routes
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.delete('/api/notes/:id', (req, res) => {
    const result = deleteNoteById(req.params.id, notes);
    res.send(result);
});

//listening to the port
app.listen(PORT, () => {
    console.log(`API server now on PORT ${PORT}!`);
});

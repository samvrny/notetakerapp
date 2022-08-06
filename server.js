const express = require('express');
const {notes} = require('./db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2) //NOTE: If something breaks, there used to be a comma here at the end of null ( null,)
    );
    return newNote;
}

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

app.listen(PORT, () => {
    console.log(`API server now on PORT ${PORT}!`);
});



//EXAMPLE FOR OFFICE HOURS BELOW

function apple (arg1, arg2) {
    console.log(arg1, arg2);
}

function appleEx() {
    let blue = 'blue';
    let yellow = 'yellow';
apple(blue, yellow);
}

function appleExTwo() {
    let red = 'red';
    let orange = 'orange';
    apple(red, orange);
}

appleEx();
appleExTwo();

//Basically, if set up a function with two parameters (apple in this instance) 
//Then whenever I call that function with arguments will they always get set into
//the value or the parameters? Basically are the parameters just waiting to accept 
//data sent (arguments?)
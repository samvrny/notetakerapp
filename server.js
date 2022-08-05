const express = require('express');
const {notes} = require('./db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api/notes', (req, res) => {
    let results = notes;
    //console.log(results);
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});
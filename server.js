const express = require('express');
const {notes} = require('./db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();


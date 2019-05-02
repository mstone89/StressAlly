const express = require('express');
const ally = express.Router();
const Entry = require('../models/entries.js');

/****************
POST
****************/

ally.post('/', (req, res) => {
    res.send('route working');
});

/****************
GET
****************/

// INDEX ROUTE
ally.get('/', (req, res) => {
    res.render('ally/index.ejs');
});

// NEW ENTRY ROUTE
ally.get('/new-entry', (req, res) => {
    res.render('ally/new-entry.ejs');
});

// SHOW ENTRIES ROUTE
ally.get('/entries', (req, res) => {
    res.send('route working');
});

module.exports = ally;

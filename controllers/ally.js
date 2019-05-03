const express = require('express');
const ally = express.Router();
const Entry = require('../models/entries.js');

/****************
POST
****************/

ally.post('/', (req, res) => {
    if (req.body.meditate === 'on') {
        req.body.meditate = true;
    } else {
        req.body.meditate = false;
    }
    if (req.body.exercise === 'on') {
        req.body.exercise = true;
    } else {
        req.body.exercise = false;
    }
    req.body.date = req.body.date.default;
    req.body.rating = parseInt(req.body.rating);
    req.body.sleep = parseInt(req.body.sleep);
    Entry.create(req.body, (error, createdEntry) => {
        console.log(createdEntry);
        res.redirect('/ally');
    });
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
    Entry.find({}, (error, allEntries) => {
        // console.log(allEntries);
        res.render('ally/entries.ejs', {
            entries: allEntries
        });
    });
});

module.exports = ally;

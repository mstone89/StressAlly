const express = require('express');
const ally = express.Router();
const Entry = require('../models/entries.js');
const Activity = require('../models/activities.js');
const Goal = require('../models/goals.js');

/****************
DELETE
****************/

ally.delete('/:id', (req, res) => {
    Entry.findByIdAndRemove(req.params.id, (error, deletedEntry) => {
        res.redirect('/ally/entries');
    });
});

/****************
PUT
****************/

// ally.put('/:id/complete-goal', (req, res) => {
//     req.body.completed = true;
//     Goal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedGoal) => {
//         res.redirect('/ally');
//     });
// });

// EDIT SINGLE ENTRY
ally.put('/:id', (req, res) => {
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
    req.body.rating = parseInt(req.body.rating);
    req.body.sleep = parseInt(req.body.sleep);
    Entry.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedEntry) => {
        res.redirect('/ally/' + req.params.id);
    });
});

/****************
POST
****************/

// CREATE NEW GOAL
ally.post('/new-goal', (req, res) => {
    req.body.completed = false;
    Goal.create(req.body, (error, createdGoal) => {
        console.log(createdGoal);
        res.redirect('/ally');
    });
});

// CREATE NEW ENTRY
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
    Goal.find({}, (error, allGoals) => {
        res.render('ally/index.ejs', {
            goals: allGoals
        });
    })
});

// NEW ENTRY ROUTE
ally.get('/new-entry', (req, res) => {
    res.render('ally/new-entry.ejs');
});

// SHOW ALL ENTRIES ROUTE
ally.get('/entries', (req, res) => {
    Entry.find({}, (error, allEntries) => {
        // console.log(allEntries);
        res.render('ally/entries.ejs', {
            entries: allEntries
        });
    });
});

// EDIT SINGLE ENTRY ROUTE
ally.get('/:id/edit', (req, res) => {
    Entry.findById(req.params.id, (error, foundEntry) => {
        res.render('ally/edit-entry.ejs', {
            entry: foundEntry
        });
    });
});

// SHOW SINGLE ENTRY
ally.get('/:id', (req, res) => {
    Entry.findById(req.params.id, (error, foundEntry) => {
        res.render('ally/show-entry.ejs', {
            entry: foundEntry
        });
    });
});

// NEW GOAL ROUTE
ally.get('/new-goal', (req, res) => {
    res.render('ally/new-goal.ejs');
});

module.exports = ally;

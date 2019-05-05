const express = require('express');
const moment = require('moment');
const ally = express.Router();
const Entry = require('../models/entries.js');
const Activity = require('../models/activities.js');
const Goal = require('../models/goals.js');
const User = require('../models/users.js');
const session = require('express-session');
const seedActivities = require('../models/activitiesSeed.js');

/****************
SEED
****************/

ally.get('/seed/activities', (req, res) => {
    Activity.create(seedActivities, (error, createdActivities) => {
        res.redirect('/ally');
    });
});

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

// // CHOOSE NEW ACTIVITY FROM INDEX
// ally.put('/acivitity/choose-new/:id', (req, res) => {
//     Activity.findByIdAndUpdate(req.params.id, {active: false}, {new: true}, (error, activity) => {
//         res.redirect('/ally/new-activity')
//     });
// });

// CHOOSE NEW ACTIVITY
ally.put('/activity/:id', (req, res) => {
    Activity.updateMany({}, {active: false}, {new: true}, (error, data) => {
        console.log(data);
        Activity.findByIdAndUpdate(req.params.id, {active: true}, {new:true}, (error, activity) => {
            console.log(req.params.id);
            res.redirect('/ally');
        });

    });

});

// COMPLETE ACTIVITY
ally.put('/activity/complete-activity/:id', (req, res) => {
    Activity.findByIdAndUpdate(req.params.id, {active: false}, {new: true}, (error, data) => {
        res.redirect('/ally');
    });
});

// COMPLETE GOAL
ally.put('/complete-goal/:id', (req, res) => {
    req.body.completed = true;
    Goal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedGoal) => {
        res.redirect('/ally');
    });
});

// EDIT SINGLE ENTRY
ally.put('/entry/:id', (req, res) => {
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

// CREATE NEW ACTIVITY
ally.post('/new-activity', (req, res) => {
    req.body.active = false;
    Activity.create(req.body, (error, createdActivity) => {
        res.redirect('/ally/new-activity');
    });
});

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
    req.body.date = moment();
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

// NEW GOAL ROUTE
ally.get('/new-goal', (req, res) => {
    Goal.find({}, (error, allGoals) => {
        res.render('ally/new-goal.ejs', {
            goals: allGoals
        });
    });
});

// NEW ACTIVITY ROUTE
ally.get('/new-activity', (req, res) => {
    Activity.find({}, (error, allActivities) => {
        res.render('ally/new-activity.ejs', {
            activities: allActivities
        });
    });
});

// SHOW COMPLETED GOALS
ally.get('/completed-goals', (req, res) => {
    Goal.find({}, (error, allGoals) => {
        res.render('ally/show-goals.ejs', {
            goals: allGoals
        });
    });
});

// INDEX ROUTE
ally.get('/', (req, res) => {
    if (req.session.currentUser) {
        Goal.find({}, (error, allGoals) => {
            Activity.find({}, (error, allActivities) => {
                res.render('ally/index.ejs', {
                    goals: allGoals,
                    activities: allActivities
                });
            });
        });
    } else {
        res.redirect('/sessions/new');
    }
});

// NEW ENTRY ROUTE
ally.get('/new-entry', (req, res) => {
    res.render('ally/new-entry.ejs');
});

// SHOW ALL ENTRIES ROUTE
ally.get('/entries', (req, res) => {
    Entry.find({}, (error, allEntries) => {
        allEntries.forEach((entry) => {
            console.log(moment(entry.date).format('MM/DD/YYYY'));
        });
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


module.exports = ally;

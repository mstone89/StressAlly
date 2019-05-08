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
SEED ACTIVITIES
****************/

// Cited in RESOURCES.md, line 1
Activity.find().exec((error, data) => {
    let count = data.length;
    if (count === 0) {
        Activity.create(seedActivities);
    }
    console.log(count);
});

/****************
DELETE
****************/

ally.delete('/:id', (req, res) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        Entry.findByIdAndRemove(req.params.id, (error, deletedEntry) => {
            foundUser.entries.id(req.params.id).remove();
            foundUser.save((error, data) => {
                res.redirect('/ally/entries');
            });
        });
    });
});

/****************
PUT
****************/

// CHOOSE NEW ACTIVITY
ally.put('/activity/:id', (req, res) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        for (let i = 0; i < foundUser.activities.length; i++) {
            foundUser.activities[i].active = false;
        }
        foundUser.activities.id(req.params.id).active = true;
        foundUser.save((error, data) => {
            res.redirect('/ally');
        });
    });
});

// COMPLETE ACTIVITY
ally.put('/activity/complete-activity/:id', (req, res) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        foundUser.activities.id(req.params.id).active = false;
        foundUser.save((error, data) => {
            res.redirect('/ally');
        });
    });
});

// COMPLETE GOAL
ally.put('/complete-goal/:id', (req, res) => {
    req.body.completed = true;
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        Goal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedGoal) => {
            foundUser.goals.id(req.params.id).remove();
            foundUser.goals.push(updatedGoal);
            foundUser.save((error, data) => {
                res.redirect('/ally');
            });
        });
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
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        Entry.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedEntry) => {
            foundUser.entries.id(req.params.id).remove();
            foundUser.entries.push(updatedEntry);
            foundUser.save((error, data) => {
                res.redirect('/ally/' + req.params.id);
            });
        });
    });
});

/****************
POST
****************/

// CREATE NEW ACTIVITY
ally.post('/new-activity', (req, res) => {
    req.body.active = false;
    console.log(req.body);
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        Activity.create(req.body, (error, createdActivity) => {
            foundUser.activities.push(createdActivity);
            console.log(createdActivity);
            Activity.findOneAndDelete({'name': createdActivity.name}, (error, removedActivity) => {});
            foundUser.save((error, data) => {
                res.redirect('/ally/new-activity');
            });
        });
    });
    console.log(req.session.currentUser);
});

// CREATE NEW GOAL
ally.post('/new-goal', (req, res) => {
    req.body.completed = false;
    console.log(req.session.currentUser._id);
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        Goal.create(req.body, (error, createdGoal) => {
            foundUser.goals.push(createdGoal);
            foundUser.save((error, data) => {
                res.redirect('/ally');
            });
        });
    });
    console.log(req.session.currentUser);
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
    req.body.date = new Date();
    let date = req.body.date;
    date = date.toISOString();
    date = moment(date).format('MM/DD/YYYY');
    req.body.date = date;
    req.body.rating = parseInt(req.body.rating);
    req.body.sleep = parseInt(req.body.sleep);
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        Entry.create(req.body, (error, createdEntry) => {
            foundUser.entries.push(createdEntry);
            foundUser.save((error, data) => {
                res.redirect('/ally');
            });
        });
    });
    console.log(req.session.currentUser);
});

/****************
GET
****************/

// NEW GOAL ROUTE
ally.get('/new-goal', (req, res) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        res.render('ally/new-goal.ejs', {
            goals: foundUser.goals
        });
    });
});

// NEW ACTIVITY ROUTE
ally.get('/new-activity', (req, res) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        res.render('ally/new-activity.ejs', {
            activities: foundUser.activities
        });
    });
});

// SHOW COMPLETED GOALS
ally.get('/completed-goals', (req, res) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        res.render('ally/show-goals.ejs', {
            goals: foundUser.goals
        });
    });
});

// INDEX ROUTE
ally.get('/', (req, res) => {
    if (req.session.currentUser) {
        User.findById(req.session.currentUser._id, (error, foundUser) => {
            if (foundUser.activities.length === 0) {
                Activity.find({}, (error, allActivities) => {
                    for (let i = 0; i < allActivities.length; i++) {
                        foundUser.activities.push(allActivities[i]);
                        foundUser.save((error, data) => {});
                    }
                });
            }
            res.render('ally/index.ejs', {
                goals: foundUser.goals,
                activities: foundUser.activities,
                currentUser: foundUser
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
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        res.render('ally/entries.ejs', {
            entries: foundUser.entries
        });
    });
});

// EDIT SINGLE ENTRY ROUTE
ally.get('/:id/edit', (req, res) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        res.render('ally/edit-entry.ejs', {
            entry: foundUser.entries.id(req.params.id)
        });
    });
});

// SHOW SINGLE ENTRY
ally.get('/:id', (req, res) => {
    User.findById(req.session.currentUser._id, (error, foundUser) => {
        res.render('ally/show-entry.ejs', {
            entry: foundUser.entries.id(req.params.id)
        });
    });
});

module.exports = ally;

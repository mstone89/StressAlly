const mongoose = require('mongoose');
const Entry = require('../models/entries.js');
const Activity = require('../models/activities.js');
const Goal = require('../models/goals.js');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    goals: [Goal.schema],
    entries: [Entry.schema],
    activities: [Activity.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

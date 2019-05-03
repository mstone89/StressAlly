const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    current: String,
    all: Array
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

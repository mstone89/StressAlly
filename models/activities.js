const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: String,
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

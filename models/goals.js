const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    current: String,
    completed: Array
});

const Goal = mongoose.model('Goal', activitySchema);

module.exports = Goal;

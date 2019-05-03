const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    description: String,
    completed: Boolean
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;

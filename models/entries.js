const mongoose = require('mongoose');
const moment = require('moment');

const entrySchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    food: Array,
    sleep: {
        type: Number,
        min: 0,
        default: 0
    },
    meditate: Boolean,
    exercise: Boolean,
    comments: String,
    date: String
}, {
    timestamps: true
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;

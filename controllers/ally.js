const express = require('express');
const ally = express.Router();
const Entry = require('../models/entries.js');

ally.get('/', (req, res) => {
    res.render('ally/index.ejs');
});

ally.get('/new-entry', (req, res) => {
    res.send('route working');
});

module.exports = ally;

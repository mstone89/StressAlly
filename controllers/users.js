const express = require('express');
const user = express.Router();
const User = require('../models/users.js');

user.get('/new', (req, res) => {
    res.render('users/new-user.ejs');
});

module.exports = user;

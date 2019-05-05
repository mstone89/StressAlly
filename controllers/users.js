const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

users.get('/new', (req, res) => {
    res.render('users/new-user.ejs');
});

users.post('/', (req, res) => {
    User.create(req.body, (error, createdUser) => {
        if (error) {
            console.log(error);
        }
        console.log(createdUser);
        res.redirect('/');
    });
});

module.exports = users;

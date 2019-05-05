const express = require('express');
const users = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

users.get('/new', (req, res) => {
    res.render('users/new-user.ejs');
});

users.post('/', (req, res) => {
    console.log(req.body);
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        if (error) {
            console.log(error);
        }
        console.log(createdUser);
        res.redirect('/');
    });
});

module.exports = users;

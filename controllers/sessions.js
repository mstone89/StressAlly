const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
    res.render('sessions/new-session.ejs');
});

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

sessions.post('/', (req, res) => {
    console.log(req.body);
    User.findOne({username: req.body.username}, (error, foundUser) => {
        console.log(foundUser);
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.redirect('/');
        } else {
            res.send('<a href="/sessions/new">wrong password</a>');
        }
    });
});

module.exports = sessions;

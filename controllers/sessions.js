const express = require('express');
const sessions = express.Router();

sessions.get('/new', (req, res) => {
    res.render('sessions/new-session.ejs');
});

module.exports = sessions;

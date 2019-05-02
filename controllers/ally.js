const express = require('express');
const ally = express.Router();

ally.get('/', (req, res) => {
    res.send('route working');
});

module.exports = ally;

//___________________
//Dependencies
//___________________

const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const moment = require('moment');
const session = require('express-session');
require('dotenv').config();
const app = express();
const db = mongoose.connection;

//___________________
//Port
//___________________

// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Controllers
//___________________

const allyController = require('./controllers/ally.js');
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');

//___________________
//Database
//___________________

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/stress-ally-app';

// Connect to Mongo
mongoose.connect(MONGODB_URI,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
// db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
// extended: false - does not allow nested objects in query strings
app.use(express.urlencoded({ extended: true }));

//use method override
// allow POST, PUT and DELETE from a form
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use('/users', userController);

app.use('/sessions', sessionsController);

app.use('/ally', allyController);

//___________________
// Routes
//___________________

//localhost:3000
app.get('/', (req, res) => {
    res.render('index.ejs', {
      currentUser: req.session.currentUser
    });
});

//___________________
//Listener
//___________________

app.listen(PORT, () => console.log( 'Listening on port:', PORT));

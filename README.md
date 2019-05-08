# StressAlly


## Overview

StressAlly is a self-help app designed for those with anxiety. It's a tool to track daily anxiety and stress, set goals for overcoming anxious situations, and set activities and exercises to relieve anxiety and keep it at bay.

## Technologies Used

StressAlly adheres to the MVC file structure, and employs the 7 RESTful routes and full CRUD. It is hosted on Heroku [here](https://stress-ally.herokuapp.com/).

It is primarily built with:

- Node.js
- Mongoose
- Express
- EJS

In addition, it uses:

- bcrypt: for hashing passwords
- dotenv: to store environmental variables separate from main code
- express-session: for session middleware and user flow/authentication
- method-override: allows HTTP verbs that are normally unsupported by the client
- moment: a JS date library for parsing/formatting dates

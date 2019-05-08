# StressAlly


## Overview

StressAlly is a self-help app designed for those with anxiety. It's a tool to track daily anxiety and stress, set goals for overcoming anxious situations, and set activities and exercises to relieve anxiety and keep it at bay.

#### The App

[StressAlly](https://stress-ally.herokuapp.com/)

## Technologies Used

StressAlly adheres to the MVC file structure, and employs the 7 RESTful routes and full CRUD. It is hosted on Heroku.

It is built with:

- Node.js
- Mongoose
- Express
- EJS
- Bcrypt
- Dotenv
- Express-session
- Method-override
- Moment
- Bootstrap

## Approach

First brainstormed ideas for the app. I originally came up with a to-do list/calendar-type app. I honed this idea to tackle a problem for a specific group of people.

#### User Story

> As a user with anxiety, I want to log and keep track of daily stressors in one place, so I can look back on daily logs and understand what my stressors are.

#### Wireframe

![alt-text](https://github.com/mstone89/StressAlly/blob/master/stressally_wireframe.png)

I wanted to have users be able to log in to the app and only see their own unique data. I started small by getting the app working in a state before users were able to log in. In this state, I wanted users to be able to:

- Input daily entries
- Edit entries
- Show all entries thus far
- Delete entries
- Create new goals and set goals as active
- Show active goals on main user page
- Create new activities and set activities as active
- Show active activities on main user page
- View completed goals

I created models for activities, entries, and goals. Once this state was working, I then implemented user authentication for multiple users, and created a user model. I then updated the user model to tie activities, entries, and goals to each user, and only render user data unique to the logged in user.


## Notes

At some point in the future, I would like to add the following functionality:

- A resources model where users can store helpful resources (links, articles, videos, etc.) intended to provide support in overcoming stress and anxiety.
- A way to chart entry data and find correlations between anxiety rating and stressors.

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Including google auth's client id from the .env file here so that it can be used for the GoogleStrategy
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);

//Importing the Sequelize database:
const { sequelize, testConnection } = require('../server/db/index');

//Testing the database connection before we start messing with it
testConnection();


// Passport is being configured with the google auth information, also known as google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {

      //INSIDE OF HERE WE CALL THE USER INFORMATION, SEEING IF THEY LOGIN
      //NEED TO SETUP WITH THE MYSQL DATABASE

      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });

      return cb(null, profile);
    }
  )
);

//Initialize Passport in the server
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

//Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Follow link for passport explanation: https://www.passportjs.org/packages/passport-google-oauth20/

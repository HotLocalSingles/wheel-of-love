const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Including the routes from middleware and auth
const middlewareRouter = require('./routes/middleware');
const authRouter = require('./routes/auth');

const session = require('express-session');

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
    //Cb is the verify callback
    // which receives the access token and optional refresh token, as well
    // as profile which contains the authenticated user's Google profile.
    // The verify callback must call cb providing a user to complete authentication.
    function(accessToken, refreshToken, profile, cb) {

      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

//Initialize Passport in the server
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secwet uwu passwowrd' }));

app.use(passport.session());
app.use(express.json());
app.use('/', middlewareRouter);
app.use('/', authRouter);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

//Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Follow link for passport explanation: https://www.passportjs.org/packages/passport-google-oauth20/

module.exports = {
  app
};

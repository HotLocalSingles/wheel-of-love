const passport = require('passport');

//Built-in from the passport-google-oauth20
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Importing the models created for the sequelize database
const { User } = require('./db/models');

//Allowing the use of the secret ids in the .env file
require('dotenv').config();

//Passport will be using all of these configurations when the function is called. Think of it as setting up the options for passport to authenticate
//the user when they sign in with google
passport.use(
  //Creating a new instance of GoogleStrategy and setting the options to the required information. I know this from the requirements for the google cloud docs
  new GoogleStrategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/auth/google/callback', //<-- route that handles the Google OAuth 2.0 callback after successful authentication
      passReqToCallback: true
    },
    //This function is called when the user is authenticating with Google
    async (req, accessToken, refreshToken, profile, cb) => {

      try {
        const [user, created] = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: {
            googleId: profile.id,
            username: profile.id,
            name: profile.name.givenName
          } // Set the default values for the new record
        });

        if (created) {
          console.log('User created:', user.username);
        } else {
          console.log('User already exists:', user.username);
        }

        return cb(null, user);
      } catch (error) {
        console.error('Error during Google authentication:', error);
        return cb(error);
      }
    }

  )
);

//These improve performance because the session only needs to store the user id instead of the entire user object,
//as well as security because it isn't transferring all the user information every request, just the id

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


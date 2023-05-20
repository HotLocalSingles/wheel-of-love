const passport = require('passport');

//Built-in from the passport-google-oauth20
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Importing the models created for the sequelize database
const { User, FederatedCredential } = require('../db/models');

//Allowing the use of the secret ids in the .env file
require('dotenv').config();

//Function that will be called within the server/index.js
const initializePassport = () => {

  //Passport will be using all of these configurations when the function is called. Think of it as setting up the options for passport to authenticate
  //the user when they sign in with google
  passport.use(

    //Creating a new instance of GoogleStrategy and setting the options to the required information. I know this from the requirements for the google cloud docs
    new GoogleStrategy(
      {
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: 'http://localhost:3000/oauth20/redirect/google', //<-- route that handles the Google OAuth 2.0 callback after successful authentication
        scope: ['profile'],
      },

      //This function is called when the user is authenticating with Google
      async function verify(accessToken, refreshToken, profile, cb) {
        try {
          //Find or create the user using the Google profile
          const [user, created] = await User.findOrCreate({
            where: { username: profile.id },
            defaults: { name: profile.displayName },
          });

          //Check if FederatedCredential record exists for the provider and subject
          const credential = await FederatedCredential.findOne({
            where: {
              provider: 'google',
              subject: profile.id,
              user_id: user.id,
            },
          });

          //If doesn't exist, create a new one. This has to be "google" since this is a google sign-in
          if (!credential) {
            await FederatedCredential.create({
              provider: 'google',
              subject: profile.id,
              user_id: user.id,
            });
          }

          //Return the user
          return cb(null, user);
        } catch (error) {
          return cb(error);
        }
      }
    )
  );

  //These improve performance because the session only needs to store the user id instead of the entire user object,
  //as well as security because it isn't transferring all the user information every request, just the id

  //Reduce the user object to a unique identifier that can be stored in the session
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  //Retrieving the user object from the session based on the serialized user ID
  passport.deserializeUser(async function(id, cb) {
    try {
      const user = await User.findByPk(id);
      cb(null, user);
    } catch (error) {
      cb(error);
    }
  });

};

module.exports = initializePassport;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, FederatedCredential } = require('../db/models');

require('dotenv').config();

const initializePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: 'http://localhost:3000/oauth20/redirect/google',
        scope: ['profile'],
      },

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

          //If doesn't exist, create a new one
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

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

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

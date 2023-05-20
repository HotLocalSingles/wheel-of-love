//GOOGLE AUTH MIDDLEWARE
//This file is defining the routes for the google auth middleware specifically

const express = require('express');
const router = express.Router();
const passport = require('passport');

//Creates a route that will render the sign-in page.
router.get('/login', function(req, res, next) {
  res.render('login');
});

//Will redirect the user when they click "Sign in with Google"
router.get('/login/federated/google',
  passport.authenticate('google'));

//When the user clicks "sign in" button, this is triggered
//The user needs to then authenticate with passport using google, if it fails then it goes back to the login page
router.get('/oauth20/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    //Logged in, so redirect home
    res.redirect('/');
  });


module.exports = router;

//GOOGLE AUTH MIDDLEWARE

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

router.get('/oauth20/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    //Success, logged in, so redirect home
    console.log('Signed in');
    res.redirect('/');
  });


module.exports = router;

//GOOGLE AUTH MIDDLEWARE

const passport = require('passport');

const express = require('express');
const app = require('../index');
const router = express.Router();


// router.get('/login/federated/google',
//   passport.authenticate('google', { scope: ['profile'] }));

router.get('/oauth20/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;

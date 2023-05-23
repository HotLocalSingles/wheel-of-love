//GOOGLE AUTH MIDDLEWARE
//This file is defining the routes for the google auth middleware specifically

const express = require('express');
const router = express.Router();
const passport = require('passport');




router.get("/login/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/auth/google/callback",
passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
function(req, res) {
  res.redirect('/');
});


module.exports = router;

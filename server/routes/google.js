//GOOGLE AUTH MIDDLEWARE
//This file is defining the routes for the google auth middleware specifically

const express = require('express');
const router = express.Router();
const passport = require('passport');

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  const user = req.user;
  console.log("login success user", user);
  res.status(200).send(user);
});

router.get("/login/failed", (req, res) => {
  res.sendStatus(401);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});


router.get("/login/google", passport.authenticate("google", { scope: ["profile"] }));


router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/auth/login/failed",
  }));



module.exports = router;

//Express Requirements
const express = require('express');
const router = express.Router();

//Importing Axios helper functions for icebreaker API
const { getIcebreaker } = require('../helpers/icebreakers.js');

const { User } = require('../db/models.js');

// Icebreaker API request
router.get('/api', async (req, res) => {
  try {
    const response = await getIcebreaker();
    res.status(201).send(response.data.question);
  } catch (err) {
    console.error('Failed to log POST from API', err);
    res.sendStatus(500);
  }
});

// Save Icebreaker to DB
router.post('/api', async (req, res) => {
  const { icebreaker, googleId } = req.body;
  try {
    const user = await User.findOne({ where: { googleId }});
    if (user) {
      user.icebreaker = icebreaker;
      await user.save();
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error('Failed to log POST from API', err);
    res.sendStatus(500);
  }
});

module.exports = router;

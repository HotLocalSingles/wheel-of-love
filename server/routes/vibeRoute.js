//Express Requirements
const express = require('express');
const router = express.Router();

//Importing Axios helper functions for icebreaker API
const { getVibe } = require('../helpers/vibe.js');

// Post bio to API for vibe check
router.post('/', async (req, res) => {
  const { bio } = req.body;
  try {
    const response = await getVibe(bio);
    res.status(201).send(response.data);
  } catch (err) {
    console.error('Failed to POST vibe from API');
    res.sendStatus(500);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { User, Match } = require('../db/models');

//Get matches for a specific user
router.get('/matches/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    const user = await User.findByPk(userId);
    console.log(user)
    if (!user) {
      return res.sendStatus(404);
    }

    // Retrieve all matches for the user and include the associated users
    const matches = await Match.findAll({
      where: {
        [Op.or]: [
          { userId1: userId },
          { userId2: userId },
        ],
      },
      include: [
        { model: User, as: 'User2', attributes: ['id', 'name', 'picture'] },
      ],
    });

    res.status(200).send(matches);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


router.post('/matches/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { userId2 } = req.body;

    if (!userId2) {
      return res.status(400).send('userId2 is required');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    // Check if userId2 is already matched with userId1
    const existingMatch = await Match.findOne({
      where: {
        userId1: userId,
        userId2,
      },
    });

    if (existingMatch) {
      return res.status(200).send('Already matched. DM them!');
    }

    // Create a new match in the database
    const match = await Match.create({
      userId1: userId,
      userId2,
    });

    res.status(201).send(match);
    console.log('Match made successfully');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});



module.exports = router;

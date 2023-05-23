const express = require('express');
const router = express.Router();

const { User, FederatedCredential } = require('../db/models');

//GET all users
router.get('/', async (req, res) => {

  try {
    const users = await User.findAll();
    res.status(200).send(users);

  } catch (error) {
    res.status(500).send('Internal Server Error for GET All Users', error);
  }
});

//Get one user



// DELETE a user
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    await FederatedCredential.destroy({
      where: { user_id: userId }
    });

    await user.destroy();
    res.sendStatus(200);

  } catch (error) {
    res.status(500).send('Internal Server Error for deleting user', error);
  }
});


//GET One User
router.get('/:id', async (req, res) => {

  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send('User not found :(');
    }

    res.status(200).send(user);

  } catch (error) {
    res.status(500).send('Internal Server Error for finding user', error);
  }
});



module.exports = router;

const express = require('express');
const router = express.Router();

const { User } = require('../db/models');


//User for anything for an active user
const verifySession = (req, res, next) => {

  const user = req.user;

  if (!user) {
    //could also redirect
    res.status(403).send('User not logged in');
  }

  // res.status(200).send(user);

  //Invoking next should be enough
  next();
};

//GET all users
router.get('/', async (req, res) => {

  try {
    const users = await User.findAll();
    res.status(200).send(users);

  } catch (error) {
    res.status(500).send('Internal Server Error for GET All Users', error);
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

//Edit User Name
router.put('/:name', verifySession, async (req, res) => {

  const name = req.params.name;
  const insertName = req.body.name;

  try {
    const [nullReturn, updated] = await User.update({ name: insertName }, {
      where: { name: name },
      returning: true,
      plain: true
    });

    if (!updated) {
      return res.status(404).send('User not updated :(');
    }

    const user = await User.findOne({ where: { name: insertName } });

    if (!user) {
      return res.status(404).send('User not found :(');
    }

    res.status(200).send(user);

  } catch (error) {
    res.status(500).send(error);
  }
});

//Get one user by name
router.get('/:name', verifySession, async (req, res) => {

  const name = req.params.name;

  try {
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      return res.status(404).send('User not found, can not get them :(');
    }

    res.status(200).send(user);

  } catch (error) {
    res.status(500).send('Internal Server Error for finding user', error);
  }
});

//Get one match by name
router.get('/match/:name', verifySession, async (req, res) => {

  const name = req.params.name;

  try {
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      return res.status(404).send('User not found, can not get them :(');
    }

    res.status(200).send(user);

  } catch (error) {
    res.status(500).send('Internal Server Error for finding user', error);
  }
});



// DELETE a user
router.delete('/:id', verifySession, async (req, res) => {
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

//Edit User info when new user:
router.put('/edit/:id', async (req, res) => {

  const userId = req.params.id;
  const newInfo = req.body;

  console.log(userId, newInfo);

  try {
    const [nullReturn, updated] = await User.update(newInfo, {
      where: { id: userId },
      returning: true,
      plain: true
    });

    if (!updated) {
      return res.status(404).send('User not updated :(');
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).send('User not found :(');
    }

    res.status(200).send(user);

  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;

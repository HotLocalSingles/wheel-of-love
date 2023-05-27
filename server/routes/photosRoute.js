//Express Requirements
const express = require('express');
const router = express.Router();

const { User } = require('../db/models.js');
const { Photo } = require('../db/models.js');

User.hasMany(Photo, { foreignKey: 'userId3' });
Photo.belongsTo(User, { foreignKey: 'userId3' });

// Get all photos
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.sendStatus(404);
    }
    const photos = await Photo.findAll({ where: { userId3: id } });
    const userPhotos = photos.map((photo) => photo.userPhotos);
    res.status(200).send(userPhotos);
  } catch (err) {
    console.error('Failed to GET user photos from DB', err);
    res.sendStatus(500);
  }
});

// Save photo to DB
router.post('/:id', async (req, res) => {
  const { imageURL, id } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.sendStatus(404);
    }
    const photo = await Photo.create({
      userPhotos: imageURL,
      userId3: id
    });
    res.sendStatus(201);
  } catch (err) {
    console.error('Failed to save photo to DB', err);
    res.sendStatus(500);
  }
});

// Delete photo from DB
router.delete('/:id/:imageURL', async (req, res) => {
  const { id, imageURL } = req.params;
  console.log(imageURL);
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.sendStatus(404);
    }
    await Photo.destroy({ where: {
      userPhotos: imageURL,
      userId3: id
    }});
    res.sendStatus(200);
  } catch (err) {
    console.error('Failed to delete photo from DB', err);
    res.sendStatus(500);
  }
});

module.exports = router;

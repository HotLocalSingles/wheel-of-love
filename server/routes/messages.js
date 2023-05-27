const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Messages } = require('../db/models');


router.get('/chats/conversations', async (req, res) => {
  //fetch the user from the session
  const currentUser = req.user;

  //if there's no user logged in
  if (!currentUser) {
    res.status(401).send("Please log in");
    return;
  }

  const groupByRoom = (messages) => {
    return messages.reduce((rooms, message) => {
      // if the room already exists, append the message to it
      if (rooms[message.room]) {
        rooms[message.room].push(message);
      } else {
        // else create a new array with the message
        rooms[message.room] = [message];
      }
      return rooms;
    }, {});
  };
  


  try {
    // fetch all messages where the senderId or receiverId matches the current user's id
    const userMessages = await Messages.findAll({
      where: {
        [Op.or]: [{ senderId: currentUser.id }, { receiverId: currentUser.id }]
      }
    });

    // group messages by room
    const messagesByRoom = groupByRoom(userMessages);

    // create an array of conversations
    const conversations = Object.entries(messagesByRoom).map(([room, messages]) => {
      return { room, messages };
    });

    // return the array
    res.json(conversations);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Messages } = require('../db/models');


router.get('/chats/conversations', async (req, res) => {

  const groupByRoom = (messages) => {
    return messages.reduce((rooms, message) => {
      const roomName = message.room;
      //if the room already exists, append the message to it
      if (!rooms[roomName]) {
        rooms[roomName] = [];
        //else create a new array with the message
      } else {
        rooms[roomName].push(message);
      }
      return rooms;
    }, {});
  };


  try {
    //fetch all messages where the senderId or receiverId matches the current user's username
    const userMessages = await Messages.findAll({
      where: {
        [Op.or]: [{senderId: currentUser.username}, {receiverId: currentUser.username}]
      }
    });

    //group messages by 'room'
    const messagesByRoom = groupByRoom(userMessages);

    //for each group, find the message with the latest timestamp.
    const conversationsWithLatestMessage = await Promise.all(
      Object.entries(messagesByRoom).map(async ([room, messages]) => {
        //find the latest message
        const latestMessage = messages.reduce((latest, message) =>
          latest.createdAt > message.createdAt ? latest : message, messages[0]
        );
        //return conversation with latest message
        return { room, latestMessage };
      })
    );

    //return this data
    res.json(conversationsWithLatestMessage);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

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

  const groupByPartnerUsername = (messages, currentUser) => {
    return messages.reduce((partners, message) => {
      const partnerUsername = message.senderId === currentUser.username ? message.receiverId : message.senderId;
  
      //if the partner already exists, append the message to it
      if (partners[partnerUsername]) {
        partners[partnerUsername].push(message);
      } else {
        //else create a new array with the message
        partners[partnerUsername] = [message];
      }
      return partners;
    }, {});
  };
  


  try {
    //fetch all messages where the senderId or receiverId matches the current user's username
    const userMessages = await Messages.findAll({
      where: {
        [Op.or]: [{senderId: currentUser.username}, {receiverId: currentUser.username}]
      }
    });

    //group messages by match
    const messagesByPartner = groupByPartnerUsername(userMessages, currentUser);

    //create an array of conversations
    const conversations = Object.entries(messagesByPartner).map(([partner, messages]) => {
      return { partner, messages };
    });
    //return the array
    res.json(conversations);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

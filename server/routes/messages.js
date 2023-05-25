const express = require('express');
const router = express.Router();

const { Messages } = require('../db/models');

// router.get('/chats/:username', async (req, res) => {
//   try {
//     const { username } = req.params;

//     // Find all messages where the sender or receiver username matches the given username
//     const chats = await Messages.findAll({
//       where: {
//         [Op.or]: [
//           //check if sender or receiver matches username
//           { senderUsername: username },
//           { receiverUsername: username },
//         ],
//       },
//     });
//   } catch (error) {
//     res.status(500).send('Internal Server Error for GET All Chats', error);
//   }
// });

module.exports = router;

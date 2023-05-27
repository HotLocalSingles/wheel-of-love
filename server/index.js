//Express Requirements
const express = require('express');
const app = express();

require('dotenv').config();

const session = require('express-session');
//Importing path so that we can use the static files from client side
const path = require('path');
//import Messages model
const { Messages } = require('./db/models');

//Importing passport for auth
//Also importing the initializePassport function created in auth
const passport = require('passport');
require('./passportConfig');

//Importing other routes
const googleRouter = require('./routes/google');
const users = require('../server/routes/userData');
const vibe = require('../server/routes/vibeRoute.js');
const icebreaker = require('../server/routes/icebreakerRoute.js');
const conversations = require('../server/routes/messages.js');
const matchRouter = require('../server/routes/matchData.js');

//Creating server variable to require http and using app/express to initialize the server
const server = require('http').createServer(app);

//Creating socket.io server instance that is attaching the server instance
//and enabling Cross-Origin Resource Sharing for the WebSocket Server
const io = require('socket.io')(server, { cors: { origin: '*' } });

//Parses incoming JSON requests
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(session({
  secret: [process.env.COOKIE_KEY],
  resave: false,
  saveUninitialized: false,
  cookie: { }
}));


//Initialize Passport middleware and have the express server use it,
//makes it so the user doesn't have to keep logging in to authenticate requests
app.use(passport.initialize());
app.use(passport.session());


//Including other routers
app.use("/auth", googleRouter);
app.use('/users', users);
app.use('/', vibe);
app.use('/', icebreaker);
app.use('/', conversations);

app.use('/', matchRouter);

//building socket.io logic
//event emitter to check for connection
//create new socket/user on connection
//connectedUser will store the socket ids
const connectedUsers = new Map();
io.on('connection', (socket) => {
  const { userId } = socket.handshake.query;
  connectedUsers.set(userId, socket.id);
  // console.log('User connected. Socket ID:', socket.id);
  //handle private chat
  socket.on('private-chat', async ({ senderId, receiverId, room }) => {
    socket.join(room);
    console.log('Private chat connected on server');
    console.log(`User has joined room ${room}`);
  });

  //to broadcast message just to one user and not to sender
  socket.on('private-chat-message', ({ nickname, senderId, receiverId, message, room }) => {
    //emit the message to the specified person
    const receiverSocketId = connectedUsers.get(receiverId);
    if (receiverSocketId) {
      socket.to(receiverSocketId).emit('private-chat-message', { nickname, message });
    }
    //create a new message instance
    Messages.create({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      room: room
    })
      .then(() => console.log('Message saved successfully.', senderId, message, receiverId, room))
      .catch(err => console.log(err));
  });

  //handle disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



module.exports = {
  app,
};


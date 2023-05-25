//Express Requirements
const express = require('express');
const app = express();

require('dotenv').config();

const session = require('express-session');
//Importing path so that we can use the static files from client side
const path = require('path');
//import Messages model
const { Messages } = require('./db/models');
const { User } = require('./db/models');
const { id, username, name } = User;

//Importing passport for auth
//Also importing the initializePassport function created in auth
const passport = require('passport');
require('./passportConfig');

//Importing other routes
const googleRouter = require('./routes/google');
const users = require('../server/routes/userData');
const vibe = require('../server/routes/vibeRoute.js');
const icebreaker = require('../server/routes/icebreakerRoute.js');

//Creating server variable to require http and using app/express to initialize the server
const server = require('http').createServer(app);

//Creating socket.io server instance that is attaching the server instance and enabling Cross-Origin Resource Sharing for the WebSocket Server
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


//Initialize Passport middleware and have the express server use it, makes it so the user doesn't have to keep logging in to authenticate requests
app.use(passport.initialize());
app.use(passport.session());


//Including other routers
app.use("/auth", googleRouter);
app.use('/users', users);
app.use('/', vibe);
app.use('/', icebreaker);


//building socket.io logic
//event emitter to check for connection
//create new socket/user on connection

io.on('connection', (socket) => {
  //socket event creation
  console.log('user connected. socket id: ', socket.id);
  //socket join method to add 2 users to a room to chat
  socket.join('room');
  //io.to('room').emit('user-joined');

  //to broadcast message just to one user and not to sender
  socket.on('chat-message', (message) => {
    console.log('server got the message', message);
    //create a new message instance
    Messages.create({
      senderUsername: message.username,
      receiverUsername: message.receiverUsername,
      message: message.message
    })
      .then(() => console.log('Message saved successfully.', message))
      .catch(err => console.log(err));
    socket.broadcast.emit('chat-message', message.message);
  });
  //when the socket/user disconnects
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

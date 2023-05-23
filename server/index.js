//Express Requirements
const express = require('express');
const session = require('express-session');

//Importing path so that we can use the static files from client side
const path = require('path');

//Importing the sequelize store to store the client's session
//Also importing sequelize which is initializing the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../server/db/index');

//Importing passport for auth
//Also importing the initializePassport function created in auth
const passport = require('passport');
const initializePassport = require('../server/routes/auth');

//Setting up server
const app = express();
//Parses incoming JSON requests
app.use(express.json());
//Tells server where to serve static assets
app.use(express.static(path.resolve(__dirname, '../client/dist')));

//Creating server variable to require http and using app/express to initialize the server
const server = require('http').createServer(app);

//Creating socket.io server instance that is attaching the server instance and enabling Cross-Origin Resource Sharing for the WebSocket Server
const io = require('socket.io')(server, { cors: { origin: '*' } });


//Configuring the session options for the session middleware
const sessionOptions = {
  secret: 'uwu_secret', //Signs the session ID cookie
  resave: false, //Does not allow the session to save to the store on every request. Saves space
  saveUninitialized: false, //Session only saves when modified, again, saving time and space
  store: new SequelizeStore({ //Stores the session in the defined database, allows us to modify the sessions easier
    db: sequelize, //Using MY defined variable that I imported into this file called sequelize, using the database 'wheel'
  }),
};

//Use the session middleware on the app
app.use(session(sessionOptions));

//Initialize Passport middleware and have the express server use it, makes it so the user doesn't have to keep logging in to authenticate requests
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routes from middleware and auth, when we go to the '/' it automatically uses the middleware set up in the middleware file
const middlewareRouter = require('./routes/middleware');
app.use('/', middlewareRouter);


//building socket.io logic
//event emitter to check for connection
//create new socket/user on connection
io.on('connection', (socket) => {
  //socket event creation
  console.log('user connected. socket id: ', socket.id);
  //socket method to connect user to chat
  socket.on('user-joined', ({ user }, callback) => {
    //associate the socket with the authenticated user
    socket.user = user;
    console.log('user connected:', user);
    if (error) { callback(error); }
  });
  //to broadcast message just to one user and not to sender
  socket.on('chat-message', (message) => {
    console.log('server got the message', message);
    if (message !== undefined) {
      socket.broadcast.emit('chat-message', message);
    }
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

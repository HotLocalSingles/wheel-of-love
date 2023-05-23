//Express Requirements
const express = require('express');
const app = express();

require('dotenv').config();

const session = require('express-session');

//Importing path so that we can use the static files from client side
const path = require('path');


//Importing passport for auth
//Also importing the initializePassport function created in auth
const passport = require('passport');
require('./passportConfig');

//Importing other routes
const googleRouter = require('./routes/google');
const users = require('../server/routes/userData');

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
  cookie: { secure: true }
}));


//Initialize Passport middleware and have the express server use it, makes it so the user doesn't have to keep logging in to authenticate requests
app.use(passport.initialize());
app.use(passport.session());

//Including other routers
app.use('/', googleRouter);
app.use('/users', users);


//building socket.io logic
//event emitter to check for connection
io.on('connection', (socket) => {
  //socket event creation
  console.log('socket id', socket.id);
  //socket method
  socket.on('message', (data) => {
    console.log(data);
    //emit data to everyone but self
    // socket.emit(data);
    socket.broadcast.emit('message', data);
  });
});

app.get('/', function(req, res) {
  res.send('Hello, world!');
});


//Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = {
  app,
};

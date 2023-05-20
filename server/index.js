const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../server/db/index');

const initializePassport = require('../server/routes/auth');


const app = express();
//Parses incoming JSON requests
app.use(express.json());
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

//Shows the Google Login Page
app.get('/', (req, res) => {
  res.send('<h1>Sign in</h1> <a class="button google" href="/login/federated/google">Sign in with Google</a>');
});

//Session middleware
const sessionOptions = {
  secret: 'uwu_secret',
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//Use the session middleware on the app
app.use(session(sessionOptions));

//Initialize Passport and configure session support within passport and app
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routes from middleware and auth
const middlewareRouter = require('./routes/middleware');
app.use('/', middlewareRouter);


//building socket.io logic
//event emitter to check for connection
io.on('connection', (socket) => {
  //socket event creation
  console.log('socket id', socket.id);
  //socket method
  socket.emit('chat-message', 'io connection socket emit index.js server working');
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

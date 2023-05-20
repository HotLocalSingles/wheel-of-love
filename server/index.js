const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../server/db/index');

const initializePassport = require('../server/routes/auth');

const app = express();

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
const authRouter = require('./routes/auth');
app.use('/', middlewareRouter);
app.use('/', authRouter);

//Parses incoming JSON requests
app.use(express.json());

//Shows the Google Login Page
app.get('/', (req, res) => {
  res.send('<h1>Sign in</h1> <a class="button google" href="/login/federated/google">Sign in with Google</a>');
});

const server = require('http').createServer(app);

//Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
  app,
};

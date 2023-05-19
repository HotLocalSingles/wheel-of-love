const express = require('express');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Including the routes from middleware and auth
// const middlewareRouter = require('./routes/middleware');
// const authRouter = require('./routes/auth');
// app.use('/', middlewareRouter);
// app.use('/', authRouter);


// const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);

//Including google auth's client id from the .env file here so that it can be used for the GoogleStrategy
// require('dotenv').config();

const app = express();
const server = require('http').createServer(app);

//Importing the Sequelize database:
// const { sequelize, testConnection } = require('../server/db/index');

//Testing the database connection before we start messing with it
// testConnection();


// Passport is being configured with the google auth information, also known as google strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env['GOOGLE_CLIENT_ID'],
//       clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
//       callbackURL: '/oauth2/redirect/google',
//       scope: ['profile'],
//     },
//     function verify(accessToken, refreshToken, profile, cb) {
//       db.query('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
//         'google',
//         profile.id,
//       ])
//         .then(([row]) => {
//           if (!row) {
//             return db.transaction(async (transaction) => {
//               const [user] = await db.query(
//                 'INSERT INTO users (name) VALUES (?)',
//                 [profile.displayName],
//                 { transaction }
//               );

//               const { insertId: userId } = user;

//               await db.query(
//                 'INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)',
//                 [userId, 'google', profile.id],
//                 { transaction }
//               );

//               const newUser = {
//                 id: userId,
//                 name: profile.displayName,
//               };

//               return newUser;
//             });
//           } else {
//             return db.query('SELECT * FROM users WHERE id = ?', [row.user_id]);
//           }
//         })
//         .then(([row]) => {
//           if (!row) {
//             return cb(null, false);
//           }
//           return cb(null, row);
//         })
//         .catch((err) => {
//           return cb(err);
//         });
//     }
//   )
// );

const { Sequelize } = require('sequelize');


//Passing parameters separately (other dialects)
//Logging option shows connection of tables
//May want to put this into env

const sequelize = new Sequelize('wheel', 'root', '', {
  dialect: 'mysql',
  logging: false,
});

//Initialize Passport in the server
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secwet uwu passwowrd',
  store: new MySQLStore({
    sequelize,
    tableName: 'sessions'
  })
}));

app.use(passport.authenticate('session'));
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    '<h1>Sign in</h1> <a class="button google" href="/login/federated/google">Sign in with Google</a>');
});

//Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Follow link for passport explanation: https://www.passportjs.org/packages/passport-google-oauth20/

module.exports = {
  app
};

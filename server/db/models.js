const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

//Defining the Models for the Database
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    require: true
  },
  picture: {
    type: DataTypes.STRING,
  },
  icebreaker: {
    type: DataTypes.STRING,
  },
});

const Messages = sequelize.define('Messages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderUsername: {
    type: DataTypes.STRING
  },
  receiverUsername: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.STRING
  }
});


//Creates the tables if they aren't already created
sequelize
  .sync({ alter: true }) //Doesn't drop the tables and recreate them
  .then(() => {
    console.log('Tables created or synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing tables:', error);
  });

module.exports = {
  User,
  Messages
};

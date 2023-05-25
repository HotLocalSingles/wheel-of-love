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
    type: DataTypes.STRING(25),
  },
  username: {
    type: DataTypes.STRING,
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
  location: {
    type:DataTypes.STRING
  }
});


module.exports = {
  User,
};

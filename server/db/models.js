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
  },

});

//Creates the tables if they aren't already created
sequelize
  .sync({ force: false }) //Doesn't drop the tables and recreate them
  .then(() => {
    console.log('Tables created or synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing tables:', error);
  });

module.exports = {
  User,
};

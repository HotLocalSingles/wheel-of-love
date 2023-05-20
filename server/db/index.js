const { Sequelize } = require('sequelize');

// Creating a new Sequelize instance with the (database, user, password)
// It is an object that represents a connection to the database
const sequelize = new Sequelize('wheel', 'root', '', {
  dialect: 'mysql',
  logging: false,
});


module.exports = { sequelize };

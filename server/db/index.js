const { Sequelize } = require('sequelize');


//Passing parameters separately (other dialects)
//Logging option shows connection of tables
//May want to put this into env

const sequelize = new Sequelize('wheel', 'root', '', {
  dialect: 'mysql',
  logging: false,
});

//Testing database function
// eslint-disable-next-line func-style
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, testConnection };

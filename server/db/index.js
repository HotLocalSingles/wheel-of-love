const { Sequelize } = require('sequelize');

// Creating a new Sequelize instance with the (database, user, password)
// It is an object that represents a connection to the database
const sequelize = new Sequelize('wheel', 'root', '', {
  dialect: 'mysql',
  logging: false,
});

sequelize.sync();

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Database");
  } catch (error) {
    console.error("Can not connect to database", error);
  }
};

testDatabaseConnection();

module.exports = sequelize;

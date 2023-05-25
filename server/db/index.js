const { Sequelize } = require('sequelize');

// Creating a new Sequelize instance with the (database, user, password)
// It is an object that represents a connection to the database
const sequelize = new Sequelize('wheel', 'root', '', {
  dialect: 'mysql',
  logging: false,
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

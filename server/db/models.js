const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/index');

//Defining the Models for the Database
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  hashed_password: {
    type: DataTypes.BLOB,
  },
  salt: {
    type: DataTypes.BLOB,
  },
  name: {
    type: DataTypes.STRING,
  },
});

//Credentials from an external identity provider, in this case it's google
const FederatedCredential = sequelize.define('FederatedCredential', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //Also has user_id associated, look below
});

//Tying the two models together
User.hasMany(FederatedCredential, { foreignKey: 'user_id' });
FederatedCredential.belongsTo(User, { foreignKey: 'user_id' });

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
  FederatedCredential
};

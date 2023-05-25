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
});

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  userId2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: false,
});


Match.belongsTo(User, { foreignKey: 'userId1', as: 'User1' });
Match.belongsTo(User, { foreignKey: 'userId2', as: 'User2' });

module.exports = {
  User,
  Match
};

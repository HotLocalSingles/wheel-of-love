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
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  bio: {
    type: DataTypes.STRING,
  },
  vibe: {
    type: DataTypes.STRING,
  },
});

const Messages = sequelize.define('Messages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.STRING
  },
  receiverId: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.STRING
  },
  room: {
    type: DataTypes.STRING
  }
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
  Messages,
  Match
};

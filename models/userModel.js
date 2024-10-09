const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

// Define User model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  referralCode: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  technology: {
    type: DataTypes.STRING,
  },
  profilePic: {
    type: DataTypes.STRING,
  },
  dob: {
    type: DataTypes.DATE,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;

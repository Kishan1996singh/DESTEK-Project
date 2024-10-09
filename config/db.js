const { Sequelize } = require('sequelize');

// Set up Sequelize connection to a MySQL database
const sequelize = new Sequelize('formDB', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize; // Export the configured sequelize instance

const { Sequelize, DataTypes } = require('sequelize');
const { DB, USER, PASSWORD, port, dialect } = require('../config');

// Initialize Sequelize with configuration variables
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: "postgresdb",
  port: port,
  dialect: dialect,
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync() // Use force: true to drop existing tables and recreate them
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });

// Define the File model
const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = File;

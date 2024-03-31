const { Sequelize, DataTypes } = require('sequelize');
const  { DB, USER, HOST, PASSWORD, port, dialect } = require('../config');

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  port: port
});

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

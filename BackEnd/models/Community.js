// models/Community.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Community extends Model {}

Community.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('ARAB', 'AFRICAN', 'REFUGEE', 'DISABLED', 'STUDENT', 'CULTURAL', 'IMMIGRATION', 'JOB'),
    allowNull: false
  },
  language: {
    type: DataTypes.ENUM('ENGLISH', 'ARABIC', 'FRENCH'),
    defaultValue: 'ENGLISH'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  memberCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  settings: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  sequelize,
  modelName: 'Community',
  timestamps: true
});

module.exports = Community;

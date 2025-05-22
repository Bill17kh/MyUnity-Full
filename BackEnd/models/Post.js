// models/Post.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  communityId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Communities',
      key: 'id'
    }
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('DISCUSSION', 'EVENT', 'JOB', 'HELP', 'RESOURCE'),
    defaultValue: 'DISCUSSION'
  },
  language: {
    type: DataTypes.ENUM('ENGLISH', 'ARABIC', 'FRENCH'),
    defaultValue: 'ENGLISH'
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'ARCHIVED', 'MODERATED', 'DELETED'),
    defaultValue: 'ACTIVE'
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {
      views: 0,
      likes: 0,
      comments: 0,
      flags: 0
    }
  },
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: true
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  sequelize,
  modelName: 'Post',
  timestamps: true,
  indexes: [
    {
      fields: ['communityId']
    },
    {
      fields: ['authorId']
    },
    {
      fields: ['type']
    },
    {
      fields: ['status']
    }
  ]
});

module.exports = Post;

// models/index.js
const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');
const Community = require('./Community');

// User-Community Association (Many-to-Many)
User.belongsToMany(Community, {
  through: 'UserCommunities',
  foreignKey: 'userId',
  otherKey: 'communityId'
});

Community.belongsToMany(User, {
  through: 'UserCommunities',
  foreignKey: 'communityId',
  otherKey: 'userId'
});

// User-Post Association (One-to-Many)
User.hasMany(Post, {
  foreignKey: 'authorId',
  as: 'posts'
});

Post.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author'
});

// Community-Post Association (One-to-Many)
Community.hasMany(Post, {
  foreignKey: 'communityId',
  as: 'posts'
});

Post.belongsTo(Community, {
  foreignKey: 'communityId',
  as: 'community'
});

module.exports = {
  sequelize,
  User,
  Post,
  Community,
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      pseudonym: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: 'default-avatar.png'
      },
      language: {
        type: Sequelize.ENUM('ENGLISH', 'ARABIC', 'FRENCH'),
        defaultValue: 'ENGLISH'
      },
      communities: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        defaultValue: []
      },
      privacySettings: {
        type: Sequelize.JSONB,
        defaultValue: {
          showEmail: false,
          showCommunities: true,
          showActivity: true
        }
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lastActive: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        type: Sequelize.INTEGER,
      },
      challenge_id: {
        allowNull: false,
        references: {
          model: 'challenges',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.fn('NOW'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  },
};

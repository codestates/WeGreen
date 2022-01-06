'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('challenges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      started_at: {
        type: Sequelize.DATE
      },
      requirement: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('challenges ', 'requirement', {
      type: Sequelize.INTEGER,
    })
    await queryInterface.addColumn('challenges', 'join_count', {
      type: Sequelize.INTEGER,
      defaultValue:0
    })
    await queryInterface.removeColumn('challenges', 'visits')
  }
};
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users_badges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      is_selected: {
        type: Sequelize.BOOLEAN,
      },
      user_id: {
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        type: Sequelize.INTEGER,
      },
      badge_id: {
        allowNull: false,
        references: {
          model: "badges",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users_badges");
  },
};

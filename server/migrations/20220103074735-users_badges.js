"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "users_badges",
      "user_id",
      Sequelize.INTEGER
    );
    await queryInterface.addColumn(
      "users_badges",
      "badge_id",
      Sequelize.INTEGER
    );
    await queryInterface.addConstraint("users_badges", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_badges_user_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("users_badges", {
      fields: ["badge_id"],
      type: "foreign key",
      name: "users_badges_badge_id",
      references: {
        table: "badges",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "users_badges",
      "users_badges_badge_id"
    );
    await queryInterface.removeConstraint(
      "users_badges",
      "users_badges_user_id"
    );
    await queryInterface.removeColumn("users_badges", "badge_id");
    await queryInterface.removeColumn("users_badges", "user_id");
  },
};

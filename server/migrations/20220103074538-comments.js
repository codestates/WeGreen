"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("comments", "user_id", Sequelize.INTEGER);
    await queryInterface.addColumn(
      "comments",
      "challenge_id",
      Sequelize.INTEGER
    );
    await queryInterface.addConstraint("comments", {
      fields: ["user_id"],
      type: "foreign key",
      name: "comments_user_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("comments", {
      fields: ["challenge_id"],
      type: "foreign key",
      name: "comments_challenge_id",
      references: {
        table: "challenges",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("comments", "comments_challenge_id");
    await queryInterface.removeConstraint("comments", "comments_user_id");
    await queryInterface.removeColumn("comments", "challenge_id");
    await queryInterface.removeColumn("comments", "user_id");
  },
};

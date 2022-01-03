"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "users_challenges",
      "user_id",
      Sequelize.INTEGER
    );
    await queryInterface.addColumn(
      "users_challenges",
      "challenge_id",
      Sequelize.INTEGER
    );
    await queryInterface.addConstraint("users_challenges", {
      fields: ["user_id"],
      type: "foreign key",
      name: "users_challenges_user_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("users_challenges", {
      fields: ["challenge_id"],
      type: "foreign key",
      name: "users_challenges_challenge_id",
      references: {
        table: "challenges",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "users_challenges",
      "users_challenges_challenge_id"
    );
    await queryInterface.removeConstraint(
      "users_challenges",
      "users_challenges_user_id"
    );
    await queryInterface.removeColumn("users_challenges", "challenge_id");
    await queryInterface.removeColumn("users_challenges", "user_id");
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("checkins", "user_id", Sequelize.INTEGER);
    await queryInterface.addColumn(
      "checkins",
      "challenge_id",
      Sequelize.INTEGER
    );
    await queryInterface.addConstraint("checkins", {
      fields: ["user_id"],
      type: "foreign key",
      name: "checkins_user_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("checkins", {
      fields: ["challenge_id"],
      type: "foreign key",
      name: "checkins_challenge_id",
      references: {
        table: "challenges",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("checkins", "checkins_challenge_id");
    await queryInterface.removeConstraint("checkins", "checkins_user_id");
    await queryInterface.removeColumn("checkins", "challenge_id");
    await queryInterface.removeColumn("checkins", "user_id");
  },
};

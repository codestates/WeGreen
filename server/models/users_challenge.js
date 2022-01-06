"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users_challenge.belongsTo(models.challenge);
      users_challenge.belongsTo(models.user);
    }
  }
  users_challenge.init(
    {
      user_id: DataTypes.INTEGER,
      challenge_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_challenge",
    }
  );
  return users_challenge;
};

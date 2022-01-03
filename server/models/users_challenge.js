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
    }
  }
  users_challenge.init(
    {
      createAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "users_challenge",
    }
  );
  return users_challenge;
};

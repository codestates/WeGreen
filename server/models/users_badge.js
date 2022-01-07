"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_badge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users_badge.belongsTo(models.user);
      users_badge.belongsTo(models.badge);
    }
  }
  users_badge.init(
    {
      user_id: DataTypes.INTEGER,
      badge_id: DataTypes.INTEGER,
      is_selected: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "users_badge",
    }
  );
  return users_badge;
};

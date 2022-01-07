"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.users_challenge, {
        foreignKey: "id",
      });
      models.user.hasMany(models.checkin, {
        foreignKey: "id",
      });
      models.user.hasMany(models.comment, {
        foreignKey: "id",
      });
      models.user.hasMany(models.users_badge, {
        foreignKey: "id",
      });
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      is_social: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      bio: {
        type: DataTypes.STRING,
        defaultValue: "자기소개를 입력해주세요.",
      },
      badge_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};

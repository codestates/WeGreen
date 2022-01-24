'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users_challenge.belongsTo(models.challenge);
      models.users_challenge.belongsTo(models.user);
    }
  }
  users_challenge.init(
    {
      user_id: DataTypes.INTEGER,
      challenge_id: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'users_challenge',
    }
  );
  return users_challenge;
};

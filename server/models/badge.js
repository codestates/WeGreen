'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class badge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.badge.hasMany(models.users_badge);
    }
  }
  badge.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'badge',
    }
  );
  return badge;
};

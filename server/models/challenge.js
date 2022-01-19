'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.challenge.hasMany(models.users_challenge);
      models.challenge.hasMany(models.checkin);
      models.challenge.hasMany(models.comment);
      models.challenge.belongsTo(models.user);
    }
  }
  challenge.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.STRING,
      started_at: DataTypes.DATEONLY,
      requirement: DataTypes.INTEGER,
      author: DataTypes.INTEGER,
      // visits : {type : DataTypes.INTEGER,
      // }
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'challenge',
    }
  );
  return challenge;
};

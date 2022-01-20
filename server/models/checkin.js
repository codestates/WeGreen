'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checkin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      checkin.belongsTo(models.challenge);
      checkin.belongsTo(models.user);
    }
  }
  checkin.init(
    {
      user_id: DataTypes.INTEGER,
      challenge_id: DataTypes.INTEGER,
      // content: DataTypes.STRING, //advanced에서 사용
      created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'checkin',
    }
  );
  return checkin;
};

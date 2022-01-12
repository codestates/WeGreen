'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.challenge);
      models.comment.belongsTo(models.user);
    }
  }
  comment.init(
    {
      user_id: DataTypes.INTEGER,
      challenge_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'comment',
    }
  );
  return comment;
};

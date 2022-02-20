'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  code.init({
    email: DataTypes.STRING,
    confirmation_code: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'code',
  });
  return code;
};
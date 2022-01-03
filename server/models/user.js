'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    is_social: DataTypes.BOOLEAN,
    is_admin: DataTypes.BOOLEAN,
    bio: DataTypes.STRING,
    badge_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
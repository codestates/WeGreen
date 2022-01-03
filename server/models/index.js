"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { badges } = require("../controllers");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//associations 설정
const {
  user,
  challenge,
  users_challenge,
  checkin,
  badge,
  comment,
  users_badge,
} = sequelize.models;
challenge.belongsTo(users_challenge);
challenge.belongsTo(checkin);
challenge.belongsTo(comment);
user.belongsTo(users_challenge);
user.belongsTo(checkin);
user.belongsTo(comment);
user.belongsTo(users_badge);
badge.belongsTo(users_badge);

users_challenge.hasMany(challenge);
checkin.hasMany(challenge);
comment.hasMany(challenge);
users_challenge.hasMany(user);
checkin.hasMany(user);
comment.hasMany(user);
users_badge.hasMany(user);
users_badge.hasMany(badge);

module.exports = db;

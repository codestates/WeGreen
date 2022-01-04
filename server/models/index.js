"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { badges } = require("../controllers");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
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
challenge.hasMany(users_challenge);
challenge.hasMany(checkin);
challenge.hasMany(comment);
user.hasMany(users_challenge);
user.hasMany(checkin);
user.hasMany(comment);
user.hasMany(users_badge);
badge.hasMany(users_badge);

users_challenge.belongsTo(challenge);
checkin.belongsTo(challenge);
comment.belongsTo(challenge);
users_challenge.belongsTo(user);
checkin.belongsTo(user);
comment.belongsTo(user);
users_badge.belongsTo(user);
users_badge.belongsTo(badge);

module.exports = db;

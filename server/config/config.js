const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "wegreen",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "wegreen",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
  },
};
module.exports = config;

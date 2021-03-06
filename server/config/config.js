const dotenv = require('dotenv');
dotenv.config();

const config = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'wegreen',
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
  },
  production: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'wegreen',
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
  },
};
module.exports = config;

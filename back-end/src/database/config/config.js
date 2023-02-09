require('dotenv').config();

const options = {
  host: process.env.MYSQLHOST || 'localhost',
  port: process.env.MYSQLPORT || '3306',
  database: process.env.MYSQLDATABASE || 'delivery-app',
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
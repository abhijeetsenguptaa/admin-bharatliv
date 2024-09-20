require('dotenv').config();
const sequelize = require('sequelize');


const connection = new sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST
});

module.exports = connection;
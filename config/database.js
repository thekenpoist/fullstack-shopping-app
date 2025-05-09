require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { 
        process.env.DB_DIALECT, 
        process.env.DB_HOST
    });

module.exports = sequelize;
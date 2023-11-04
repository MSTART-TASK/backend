'use strict';
require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');


const postgresURL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DB_URL 
const configSequelize = new Sequelize(postgresURL, {})

module.exports = {
     configSequelize,
     DataTypes
}

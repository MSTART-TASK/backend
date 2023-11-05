'use strict';
const { Sequelize } = require("sequelize");
const { configSequelize, DataTypes } = require("..");

const dealsTable = configSequelize.define('Deals', {
     ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
     },
     name: {
          type: DataTypes.STRING,
          allowNull: false
     },
     status: {
          type: DataTypes.STRING,
     },
     server_dateTime: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
     },
     dateTime_UTC: {
          type : DataTypes.DATE
     },
     description: {
          type : DataTypes.STRING
     },
     amount: {
          type : DataTypes.FLOAT
     },
     currency: {
          type : DataTypes.STRING
     }
})


module.exports = dealsTable
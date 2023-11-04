'use strict';
const { Sequelize } = require("sequelize");
const { configSequelize, DataTypes } = require("..");
const { usersTable } = require("./users.model");

const claimedDealsTable = configSequelize.define('ClaimedDeals', {
     ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
     },
     userID: {
          type : DataTypes.INTEGER
     },
     dealID: {
          type : DataTypes.INTEGER
     },
     server_dateTime: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
     },
     dateTime_UTC: {
          type : DataTypes.DATE
     },
     amount: {
          type : DataTypes.FLOAT
     },
     currency: {
          type : DataTypes.STRING
     }
})


usersTable.hasMany(claimedDealsTable ,{foreignKey : 'userID' , sourceKey : 'ID'})
claimedDealsTable.belongsTo(usersTable ,{foreignKey : 'userID' , sourceKey : 'ID'})

module.exports = claimedDealsTable
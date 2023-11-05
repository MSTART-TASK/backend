'use strict';
require('dotenv').config()
const { Sequelize } = require("sequelize");
const { configSequelize, DataTypes } = require("..");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY
const bcrybt = require('bcrypt');
const dealsTable = require('./deals.model');

const usersTable = configSequelize.define('Users', {
     ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
     },
     name: {
          type: DataTypes.STRING,
          allowNull: false
     },
     email: {
          type: DataTypes.STRING,
          validate: { isEmail: true },
          unique : true,
          allowNull: false
     },
     password: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     phone: {
          type: DataTypes.STRING,
          allowNull: false
     },
     status: {
          type: DataTypes.STRING,
     },
     gender: {
          type: DataTypes.ENUM('male', 'female')
     },
     img: {
          type: DataTypes.STRING
     },
     date_of_birth: {
          type: DataTypes.STRING,
     },
     server_dateTime: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW
     },
     last_login_dateTime_UTC: {
          type :DataTypes.DATE
     },
     role: {
          type: DataTypes.ENUM('user', 'admin'),
          defaultValue : 'user'
     },
     token: {
          type: DataTypes.VIRTUAL,
          get() {
               return jwt.sign({ID : this.ID , name : this.name , role : this.role , Status : this.Status , img : this.img , email : this.email } , secretKey)
          }
     }
})

 const checkUser = async (email, password) => {
      try {
           const checkEmail = await usersTable.findOne({ where: { email } })           
           if (checkEmail) {
                const checkPassword = await bcrybt.compare(password , checkEmail.password)
                if(checkPassword) {
                     return {
                         token : checkEmail.token
                     }
                }else{
                    return 'Password Not Correct'
                }
           } else {
               return 'User Not Found'
           }
      }catch (err) {
           console.log(err);
     }
 }


 // relation between  deal and user that want it 
usersTable.hasMany(dealsTable , {foreignKey : "userID" , sourceKey : "ID"})
dealsTable.belongsTo(usersTable , {foreignKey : "userID" , sourceKey : "ID"})


 
module.exports = {
     usersTable,
     checkUser,
}

const {  usersTable } = require("../Model/Tables/users.model");
const jwt = require("jsonwebtoken");
require('dotenv').config()


module.exports = async(req , res , next) => {
     try {
          let token = req.headers.authorization?.split(' ').pop()
          if (token) {
               let tokenInfo = jwt.verify(token, process.env.SECRET_KEY)
               let userInfo = await usersTable.findOne({ where: { email : tokenInfo.email } })
               if (userInfo) {
                    req.userInfo = userInfo
                    next()
               } else next('invalid token')
               
          } else next('please enter token')
          
     }catch (err) {
          next(err)
     }
}
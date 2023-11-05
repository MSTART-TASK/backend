const base64 = require('base-64')
const { checkUser } = require('../Model/Tables/users.model')

module.exports = (req, res, next) => {
     try {
          let userData = req.headers.authorization?.split(' ').pop()

          if (userData) {
               const [email , password] = base64.decode(userData).split(':') 
               checkUser(email, password).then(result => {
                    req.userData = result
                    next()                    
               }).catch(err => {
                    next(err);
               })
          }
     } catch (err) {
          next(err);
     }
}

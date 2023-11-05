module.exports = (req, res, next) => {
     try {
          if (req.userInfo.dataValues.role == 'admin') {
               next()
          } else {
               next('acces denied')
          }
     } catch (err) {
          next(err)
     }
}
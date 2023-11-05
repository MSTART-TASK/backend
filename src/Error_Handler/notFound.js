module.exports = (reg , res) => {
     try {
          res.status(404).json({
               message:'Page Not Found'
          })
     } catch (err) {
          console.log(err);
     }
}
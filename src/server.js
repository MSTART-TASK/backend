'use strict';

const express = require('express')
const app = express()
const cors = require('cors');
const userRoutes = require('./Routes/user.routes');
const notFound = require('./Error_Handler/notFound');
const serverError = require('./Error_Handler/serverError');
const dealRoutes = require('./Routes/deal.routes');
const adminRoutes = require('./Routes/admin.routes');
const claimedDealsRoutes = require('./Routes/claimedDeals.routes');

require('dotenv').config()

app.use(cors())
app.use(express.json())

// Main Routes

app.use(userRoutes)
app.use(dealRoutes)
app.use(adminRoutes)
app.use(claimedDealsRoutes)

app.get('/', (req, res , next) => {
     try {
          res.status(200).json({
               message : 'Home Page'
          })
     } catch (err){
          next(err)
     }
})

// Error Routes
app.use('*' , notFound)
app.use(serverError)



const Start = (port) => {
     app.listen(port, () => {
          console.log(`up and running on port ${port}`);
     })
}

module.exports = {
     Start,
     app
}

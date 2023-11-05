'use strict';
const userRoutes = require('express').Router()
const { uploadToMulter, uploadToCloudinary } = require('../Middleware/Multer/multer');
const adminRole = require('../Middleware/adminRole');
const bearerAuth = require('../Middleware/bearerAuth');
const signin = require('../Middleware/signin');
const claimedDealsTable = require('../Model/Tables/claimedDeals.model');
const dealsTable = require('../Model/Tables/deals.model');
const {usersTable} = require('../Model/Tables/users.model');
const bcrybt = require('bcrypt')



// User Routes
userRoutes.route('/signin')
     .get(signinGetHndler)
     .post(signin,signinPostHndler)
userRoutes.route('/signup')
     .get(signupGetHndler)
     .post(signupPostHndler)
userRoutes.get('/userInfo/:id' , bearerAuth  ,userInfoHandler)
userRoutes.get('/userInfoAndDeals/:id' , bearerAuth  ,userInfoAndDealsHandler)
userRoutes.get('/userInfoAndClaimedDeals/:id' , bearerAuth  ,userInfoAndClaimedDealsHandler)




// User Handlers
function signinGetHndler (req, res) {
     res.status(200).json({
          message: 'Signin Page'
     })
}

function signupGetHndler (req, res) {
     res.status(200).json({
          message : 'Signup Page'
     })
}

function signinPostHndler(req, res) {
     console.log(req.userData);
     let userData = req.userData
     res.status(201).json({
          message: 'signin Post',
          userData
     })
}

async function signupPostHndler(req, res , next) {
     try {
          let body = req.body
          let password = await bcrybt.hash(body.password , 5)
          let DB_response = await usersTable.create({
               ...body , password : password
          })
          console.log(DB_response);
          res.status(201).json({
               message: 'signup Post',
               DB_response
          })
     } catch (err) {
          next(err)
     }    
}

async function userInfoHandler(req, res, next) {
     try {
          let ID = req.params.id
          let userInfo = await usersTable.findOne({ where: { ID } })
          res.status(200).json({userInfo})
     } catch (err) {
          next(err)
     }
}

async function userInfoAndDealsHandler(req, res, next) {
     try {
          let ID = req.params.id
          let userInfo = await usersTable.findByPk(ID , { include : {model : dealsTable} })
          res.status(200).json({userInfo})
     } catch (err) {
          next(err)
     }
}
async function userInfoAndClaimedDealsHandler(req, res, next) {
     try {
          let ID = req.params.id
          let userInfo = await usersTable.findByPk(ID , { include : {model : claimedDealsTable} })
          res.status(200).json({userInfo})
     } catch (err) {
          next(err)
     }
}

// profileImage
userRoutes.post('/profileImage', uploadToMulter.single('image'), uploadToCloudinary , async (req, res , next) => {
     try{
          console.log(req.image);
          res.status(200).json('image uploaded')
     } catch (err) {
          console.log('================================== err');
          // next(err)
     }
})



module.exports = userRoutes

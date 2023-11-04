const {usersTable} = require('../Model/Tables/users.model');
const adminRoutes = require('express').Router()
const adminRole = require('../Middleware/adminRole');
const bearerAuth = require('../Middleware/bearerAuth');
const dealsTable = require('../Model/Tables/deals.model');
const claimedDealsTable = require('../Model/Tables/claimedDeals.model');


// Admin Routes

adminRoutes.get('/admin/AllUsers' ,bearerAuth ,adminRole, getAllUsersHandler )
adminRoutes.get('/admin/AllDeals' ,bearerAuth ,adminRole,getAllDealsHandler )
adminRoutes.get('/admin/AllClaimedDeals' ,bearerAuth ,adminRole,getAllClaimedDealsHandler )
adminRoutes.get('/admin/SearchClaimedDeals/:id' ,bearerAuth ,adminRole , SearchClaimedDealsHandler )
adminRoutes.delete('/admin/DeleteUsers', bearerAuth ,adminRole, DeleteUsersHandler)




// Admin Handler

async function getAllUsersHandler(req,res , next) {
     try {
          let users = await usersTable.findAll()
          res.status(200).json({users})
     } catch (err) {
          next(err);
     }
}
async function getAllDealsHandler(req,res , next) {
     try {
          let deals = await dealsTable.findAll()
          res.status(200).json({deals})
     } catch (err) {
          next(err);
     }
}
async function getAllClaimedDealsHandler(req,res , next) {
     try {
          let claimedDeals = await claimedDealsTable.findAll()
          res.status(200).json({claimedDeals})
     } catch (err) {
          next(err);
     }
}
async function SearchClaimedDealsHandler(req,res , next) {
     try {
          let ID = req.params.id
          let claimedDeals = await claimedDealsTable.findAll({where :{ID}})
          res.status(200).json({claimedDeals})
     } catch (err) {
          next(err);
     }
}
async function DeleteUsersHandler(req,res , next) {
     try {
          let { IDs } = req.body
          await usersTable.destroy({where :{ID : IDs}})
          res.status(204).json({
               message : 'Users Deleted Successfully'
          })
     } catch (err) {
          next(err);
     }
}

module.exports = adminRoutes
const bearerAuth = require('../Middleware/bearerAuth')
const dealsTable = require('../Model/Tables/deals.model')

const dealRoutes = require('express').Router()

// Deals Routes
dealRoutes.route('/deal')
     .get(bearerAuth, getAllDealsHandlers)
     .post(bearerAuth,addNewDealHandler)
dealRoutes.route('/deal/:id')
     .get(bearerAuth , getOneDealHandler)
     .patch(bearerAuth,changeDealStatus)
     .delete(bearerAuth , deleteDealHandler)


// Deals Handlers
async function getAllDealsHandlers(req,res,next) {
     try {
          const deals = await dealsTable.findAll()
          res.status(200).json({
               message: 'All Deals',
               deals
          })
     } catch (err) {
          next(err)
     }
}
async function addNewDealHandler(req, res, next) {
     try {
          const body = req.body
          const newDeal = await dealsTable.create(body)
          res.status(201).json({
               message: 'Deal Created',
               newDeal
          })
     } catch (err) {
          next(err)
     }
}
async function changeDealStatus(req, res, next) {
     try {
          const ID = req.params.id
          const {status} = req.body
          const updateDeal = await dealsTable.update({ status }, { where: { ID }, returning: true })
          res.status(203).json({
               message: 'Status Updated successfully',
               updateDeal
          })
     } catch (err) {
          next(err)
     }
}
async function getOneDealHandler(req, res, next) {
     try {
          const ID = req.params.id
          const Deal = await dealsTable.findOne({ where: { ID } })
          res.status(200).json({
               message: 'Get One Deal',
               Deal
          })
     } catch (err) {
          next(err)
     }
}
async function deleteDealHandler(req, res, next) {
     try {
          const ID = req.params.id
          await dealsTable.destroy({ where: { ID } })
          res.status(204).json({
               message: 'Deal deleted successfully'
          })
     } catch (err) {
          next(err)
     }
}


module.exports = dealRoutes
const bearerAuth = require('../Middleware/bearerAuth')
const claimedDealsTable = require('../Model/Tables/claimedDeals.model')
const claimedDealsRoutes = require('express').Router()


claimedDealsRoutes.get('/claimeDeal/:id' ,bearerAuth,getClaimeDealHandler)
claimedDealsRoutes.post('/claimeDeal' ,bearerAuth,claimeDealHandler)

async function getClaimeDealHandler(req,res,next) {
     try {
          const ID = req.params.id
          const claimedDeal = await claimedDealsTable.findOne({ where: { ID } })
          res.status(200).json({claimedDeal})
     } catch (err) {
          next(err)
     }
}
async function claimeDealHandler(req,res,next) {
     try {
          let body = req.body
          const claimedDeal = await claimedDealsTable.create(body)
          res.status(200).json({claimedDeal})
     } catch (err) {
          next(err)
     }
}

module.exports = claimedDealsRoutes
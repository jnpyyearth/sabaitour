const express =require("express");
const router = express.Router();
const reportCon = require('../controllers/report')
require('dotenv').config();


router.get('/getOverviewReport',reportCon.getOverViewReport)
router.get('/getPopularTour',reportCon.populartour)
router.get('/mostincomeTour',reportCon.mostincomeTour)
router.get('/totalRevenue',reportCon.TotalRevenue)
router.get('/getmanager',reportCon.getmanager)
router.get('/getguide',reportCon.getguide)
router.get('/getinboundguide',reportCon.getInboundguide)
router.get('/getoutboundguide',reportCon.getOutboundguide)
router.get('/getallpar',reportCon.getallpar)
router.get('/getpaidpar',reportCon.getpaidpar)
router.get('/getpendingpar',reportCon.getpendingpar)
router.get('/getcountinbound' , reportCon.getcountinbound)
router.get('/getcountoutbound' , reportCon.getcountoutbound)
module.exports =router;
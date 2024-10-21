const express =require("express");
const router = express.Router();
const tourCon = require("../controllers/tour");
const upload = require('../middleware/upload')
require('dotenv').config();
router.post('/addTour',upload.single('image'),tourCon.addOriginalTour)
router.get('/tour',tourCon.getAllTour)
router.post('/addProgramTour',upload.single('pdf'),tourCon.addProgramTour)
router.get('/AllProgramTourForCard',tourCon.getAllProgramTourForCard)
router.put('/updateProgramTour/:id',tourCon.updateProgramTour)
router.put('/cancelledProgramTour/:id',tourCon.cancelledProgramTour)
router.get('/getProgramTourById/:id',tourCon.getProgramTourById)
router.get('/getInboundProgram',tourCon.getAllProgramTourForCardInbound)
router.get('/getOutboundProgram',tourCon.getAllProgramTourForCardOutbound)
router.post('/checkSameGuide',tourCon.checksameguide)
router.post('/getProgramTourForGuide',tourCon.getProgramTourForGuide)
router.get('/getTouristById/:id',tourCon.gettouristById)
module.exports =router;
const express =require("express");
const router = express.Router();
const tourCon = require("../controllers/tour");
require('dotenv').config();

router.get('/tour',tourCon.getAllTour)
router.post('/addProgramTour',tourCon.addProgramTour)
router.get('/AllProgramTourForCard',tourCon.getAllProgramTourForCard)
router.put('/updateProgramTour/:id',tourCon.updateProgramTour)
router.put('/cancelledProgramTour/:id',tourCon.cancelledProgramTour)
router.get('/getProgramTourById/:id',tourCon.getProgramTourById)
module.exports =router;
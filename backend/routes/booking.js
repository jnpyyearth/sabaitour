const express =require("express");
const router = express.Router();
const bookingCon = require("../controllers/booking");
require('dotenv').config();

router.post('/addbooking',bookingCon.addbooking)
router.put('/bookedCancelling/:id',bookingCon.canceling)
router.get('/getmybooked/:id',bookingCon.getAllProgramTourCheck)
router.get('/getParticipants',bookingCon.getAllฺBookingParticipants)
router.put('/updatePayment/:id',bookingCon.payment)
module.exports =router;
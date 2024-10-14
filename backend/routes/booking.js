const express =require("express");
const router = express.Router();
const bookingCon = require("../controllers/booking");
require('dotenv').config();

router.post('/addbooking',bookingCon.addbooking)
router.put('/bookedCancelling/:id',bookingCon.canceling)
module.exports =router;
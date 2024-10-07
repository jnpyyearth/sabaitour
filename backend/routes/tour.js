const express =require("express");
const router = express.Router();
const tourCon = require("../controllers/tour");
require('dotenv').config();

router.get('/tour',tourCon.getAllTour)

module.exports =router;
const express =require("express");
const router = express.Router();
const reviewCon = require("../controllers/review");
require('dotenv').config();

router.post('/review',reviewCon.addreview)

module.exports =router;
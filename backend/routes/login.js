const express =require("express");
const router = express.Router();
const loginCon = require("../controllers/login");
require('dotenv').config();


router.post('/login',loginCon.loginUser)
router.post('/getCus_ID',loginCon.getCustomerInfo)
module.exports =router;

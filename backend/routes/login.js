const express =require("express");
const router = express.Router();
const loginCon = require("../controllers/login");
require('dotenv').config();


router.post('/login',loginCon.loginUser)

module.exports =router;

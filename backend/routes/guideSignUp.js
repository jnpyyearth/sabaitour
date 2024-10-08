const express =require("express");
const router = express.Router();
const guideSignUp = require("../controllers/guideSignUp");
require('dotenv').config();

router.post('/guideSignUp',guideSignUp.signUp)

module.exports =router;
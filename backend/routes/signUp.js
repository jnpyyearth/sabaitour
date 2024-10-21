const express =require("express");
const router = express.Router();
const signUp = require("../controllers/signUp");
require('dotenv').config();

router.post('/signUp',signUp.signUp)

module.exports =router;
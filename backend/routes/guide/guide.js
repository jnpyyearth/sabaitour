const express =require("express");
const router = express.Router();
const guideCon = require("../../controllers/guide");
require('dotenv').config();

router.get('/allGuide',guideCon.getAllguide)

module.exports =router;
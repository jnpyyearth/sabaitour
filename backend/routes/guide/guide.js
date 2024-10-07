const express =require("express");
const router = express.Router();
const guideCon = require("../../controllers/guide");
require('dotenv').config();

router.get('/allGuide',guideCon.getAllguide)
router.get('/inbound-guide',guideCon.getInboundGuides)
router.get('/outbound-guide',guideCon.getOutboundGuides)
module.exports =router;
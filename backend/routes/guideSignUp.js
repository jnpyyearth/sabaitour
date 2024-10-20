const express =require("express");
const router = express.Router();
const guideSignUp = require("../controllers/guideSignUp");
const upload = require('../middleware/upload')
require('dotenv').config();

router.post('/guideSignUp',upload.single('image'),guideSignUp.signUp)
router.post ('/managerSignup',upload.single('image'),guideSignUp.managersignUp)
module.exports =router;
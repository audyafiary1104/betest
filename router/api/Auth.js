const express = require("express");
const router = express.Router();
const AuthController = require("../../controller/AuthController");
const {RequestValidation} = require('../../middleware')

router.post('/login',RequestValidation.Login,AuthController.Login)
router.post('/register',RequestValidation.CreateUsers,AuthController.Register)
module.exports = router;
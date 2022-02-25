const express = require("express");
const router = express.Router();
const UserController = require("../../controller/UserController");
const {authJwt,RequestValidation} = require('../../middleware')
router.post('/create',[authJwt.verifyToken,RequestValidation.CreateUsers],UserController.CreateUser)
router.get('/list', [authJwt.verifyToken], UserController.AllUser)
router.get('/single',[authJwt.verifyToken,RequestValidation.UserSingle], UserController.getUserSingle)
router.put('/update/:userid', [authJwt.verifyToken,RequestValidation.UpdateUsers],UserController.Update)
router.delete('/delete/:userid', [authJwt.verifyToken,RequestValidation.Delete],UserController.Delete)

module.exports = router;

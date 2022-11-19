const express = require('express')
const router = express.Router()
const { body } = require("express-validator")
const {validateSignUp} = require("../middlewares/authValidators") 
const authController = require('../controllers/authController')

//user sign in
// router.post("/signin", )

//user sign up
router.post("/signup", validateSignUp, authController.userSignup)
router.post("/login", authController.login)
module.exports = router
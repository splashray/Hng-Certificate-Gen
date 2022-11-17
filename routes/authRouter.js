const express = require('express')
const router = express.Router()
const {body} = require("express-validator")
const { userSignup } = require('../controllers/authController')

//user sign in
// router.post("/signin", )

//user sign up
router.post("/signup", [body("email").trim().isEmail().withMessage("Please enter a valid email!").normalizeEmail(), body("password").trim().not().isEmpty(), body("name").trim().not().isEmpty()], userSignup)

module.exports = router
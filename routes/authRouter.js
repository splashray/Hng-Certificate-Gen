const express = require('express')
const router = express.Router()

const { userSignup } = require('../controllers/authController')

//user sign in
// router.post("/signin", )

//user sign up
router.post("/signup", userSignup)

module.exports = router
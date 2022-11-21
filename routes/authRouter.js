const express = require('express');
const router = express.Router();
const { userSignup } = require('../controllers/authController');
const {validateSignUp} = require("../middlewares/authValidators");

//user sign up
router.post("/signup", validateSignUp, userSignup);

module.exports = router;
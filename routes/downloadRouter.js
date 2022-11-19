const express = require('express')
const router = express.Router()
const { body } = require("express-validator")
const controller = require('../controllers/download')

router.post("/", controller.getUserData)

module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controllers/download')

router.post("/", controller.getUserData)

module.exports = router
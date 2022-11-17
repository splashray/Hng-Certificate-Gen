const express = require('express')
const { createCertificate } = require('../controllers/csvUploadController')

const router = express.Router()

//create new certificate record
router.post("/", createCertificate)

module.exports = router
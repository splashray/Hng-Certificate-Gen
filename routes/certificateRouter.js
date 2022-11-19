const express = require('express')
const router = express.Router()

const { getCertificate } = require('../controllers/certificateController')


router.get("/:id", getCertificate)

module.exports = router
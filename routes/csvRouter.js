const express = require('express')
const router = express.Router()
const fileExtLimiter = require('../middleware/fileExtLimiter')
const filePayLoadExist = require('../middleware/filePayLoadExist')
const { handleCsv } = require('../controllers/csvController');
const { createCertificate } = require('../controllers/csvUploadController');


router.post('/', fileExtLimiter, filePayLoadExist, handleCsv)
router.post('/user')

module.exports = router;
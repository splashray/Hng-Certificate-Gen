const express = require('express');
const router = express.Router();

const { getAllCertificates} = require('../controllers/userCertificateController');

router.get('/', getAllCertificates);

module.exports = router;
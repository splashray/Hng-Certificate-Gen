const express = require('express');
const router = express.Router();

const { getAllCertificates, addCertificate, getNumberOfCertificates } = require('../controllers/userCertificateController');

router.get('/', getAllCertificates);
router.get('/count', getNumberOfCertificates)
router.post('/', addCertificate);

module.exports = router;
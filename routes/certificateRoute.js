const express = require('express');
const router = express.Router();

const { getNoOfCertificatesIssued} = require('../controllers/certificateController');

router.get('/issuedCertificate', getNoOfCertificatesIssued);

module.exports = router;
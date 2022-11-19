const express = require('express');

const {
  createSingleCertificate,
} = require('../controllers/singleUploadController');
const router = express.Router();

// single upload route
router.post('/', createSingleCertificate);

module.exports = router;

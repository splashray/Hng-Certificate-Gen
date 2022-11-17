const express = require('express')
const router = express.Router()
const { getWaitlist, sendEmail } = require('../controllers/waitlistController')

router.get('/', getWaitlist);
router.post('/', sendEmail);

module.exports = router;
const express = require('express')
const router = express.Router()
const { pay,callback } = require('../controllers/paymentController')

// initialize payment
router.post('/paystack/pay',  pay)

// verify payment
router.get('/paystack/callback', callback)


module.exports = router
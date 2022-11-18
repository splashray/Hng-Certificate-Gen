const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
  userSignup,
  forgotPassword,
  changePassword,
} = require('../controllers/authController')

router.post(
  '/signup',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email!')
      .normalizeEmail(),
    body('password').trim().not().isEmpty(),
    body('name').trim().not().isEmpty(),
  ],
  userSignup,
)
router.post('/forgotPassword', forgotPassword)
router.post('/confirmPassword/:token', changePassword)
module.exports = router

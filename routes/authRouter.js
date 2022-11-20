const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
  userSignup,
  forgotPassword,
  changePassword,
} = require('../controllers/authController')

const authentication = require('../middlewares/authentication')

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
router.route('/forgotPassword').post(forgotPassword)
router.route('/confirmPassword/:token').post(changePassword)
module.exports = router

const express = require('express')
const router = express.Router()

const {
  signup,
  signin,
  forgotPassword,
  changePassword,
  logout,
} = require('../controllers/authController')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout', logout)
router.post('/forgotpassword', forgotPassword)
router.post('/changepassword', changePassword)

module.exports = router

const express = require('express')
const router = express.Router()

const { updateUserName, updateAvatar } = require('../controllers/userController')
const { updatePassword } = require('../controllers/userController')

//update user details users details
router.put('/:id', updateUserName, updateAvatar);

//update users password
router.put("/password/update", updatePassword)

module.exports = router

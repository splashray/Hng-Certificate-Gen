const express = require('express')
const router = express.Router()

const { updateUserName, updateAvatar } = require('../controllers/userController')

//get a users details
router.put('/:id', updateUserName, updateAvatar);

//get all users
// router.get("/", )

module.exports = router;
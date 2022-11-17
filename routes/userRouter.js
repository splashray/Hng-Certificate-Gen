const express = require('express')
const router = express.Router()

const { updatePassword } = require('../controllers/userController')

//get a users details
// router.get("/:id", )

//get all users
// router.get("/", )

//udate users password
router.put("/password-update", updatePassword)

module.exports = router
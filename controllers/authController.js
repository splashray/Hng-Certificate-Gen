const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { validationResult } = require('express-validator')

const userSignup = async (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const error = new Error('validation failed')
      error.status = 422
      error.data = errors.array()
      throw error
    }

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({ email: email })
    if (user) {
      return res
        .status(401)
        .json({ message: 'A user already exist with this email!' })
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        console.log(err)
        const error = new Error('account could not be created')
        error.statusCode = 422
        throw error
      }
      const newUser = new User({
        name: name,
        email: email,
        password: hash,
      })
      const createdUser = await newUser.save()
      res.status(200).json({
        message: 'New User has been created.',
        id: createdUser._id,
        email: createdUser.email,
      })
    })
  } catch (err) {
    next(err)
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' })
  }
  const token = jwt.sign({ email: user.email }, config.JWT_SECRET, {
    expiresIn: config.JWT_LIFETIME,
  })
  if (!token) {
    return res.status(401).json({ message: 'token cannot be verified' })
  }
  res.status(200).json({ newpasswordToken: token })
}

const changePassword = async (req, res) => {
  try {
    const { token } = req.params
    if (!token) {
      return res.status(400).json({ message: 'token is required' })
    }
    const { newpassword, confirmpassword } = req?.body
    if (newpassword != confirmpassword) {
      return res
        .status(400)
        .json({ message: 'both passwords are not the same' })
    }
    const { email } = jwt.verify(token, config.JWT_SECRET)
    const user = await User.findOne({ email })
    user.password = newpassword
    user.save()
    res.status(200).send({ message: 'password changed' })
  } catch (err) {
    return res.status(401).json({ message: 'invalid Token' })
  }
}

module.exports = {
  forgotPassword,
  changePassword,
  userSignup,
}

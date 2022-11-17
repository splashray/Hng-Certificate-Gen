const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken')

//auth: create new user
const signup = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res.status(401).json({
      success: false,
      msg: 'Entered email is already registered with us. Login to continue',
    })
  }
  const newSignup = await User.create({ ...req.body })
  res.status(200).json({
    success: true,
    msg: 'New User created',
  })
}

//auth: user sign
const signin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json('Please provide email and password')
  }
  const getUser = await User.findOne({ email })
  if (!getUser) {
    return res.status(401).json('invalid email')
  }

  const samePassword = await getUser.confirmPassword(password)
  if (!samePassword) {
    return res.status(401).json('invalid password')
  }

  const userToken = generateToken(email)

  res.cookie('token', userToken)
  res.status(200).json({
    msg: 'User successfully logged in',
  })
}

//auth: forgotpassword
const forgotPassword = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json('User does not exist')
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  if (!token) {
    return res.status(401).json('token cannot be verified')
  }
  res.status(200).json({ newpasswordToken: token })
}

//auth: change password
const changePassword = async (req, res) => {
  const { newpassword, confirmpassword, token } = req.body
  try {
    if (newpassword != confirmpassword) {
      return res.status(400).json('both passwords are not the same')
    }
    const { email } = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ email })
    console.log(user)
    user.password = newpassword
    user.save()
    res.status(200).send('password changed')
  } catch (err) {
    return res.status(401).json('invalid Token')
  }
}

//auth: user logout
const logout = async (req, res) => {
  res.clearCookie('token', { maxAge: 1 })
  return res.status(200).json('successfuly logged out')
}

module.exports = {
  signup,
  signin,
  forgotPassword,
  changePassword,
  logout,
}

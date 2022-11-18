const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const updatePassword = async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(newPassword, salt)
    const user = await User.findOne({ email: email })
    if (!user) {
      res.status(404).send({ message: 'Could not find user', })
    } else {
      const isEqual = await bcrypt.compare(oldPassword, user.password)
      if (!isEqual) {
        res.status(404).send({ message: 'Could not find password' })
      } else {
        user.password = hash || user.password
        const updatedUser = await user.save()
        res.status(200).send({ user: updatedUser, message: 'Password updated' })
      }

    }
  } catch (err) {
    next(err)
  }
}


module.exports = {
  updatePassword
}

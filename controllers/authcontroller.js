const User = require('../models/userModel')
const brycpt =require('bcryptjs')

const userSignup  = async (req, res, next)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            ...req.body,
            password:hash,
        })
        await newUser.save()
         res.status(200).json({message: "New User has been created."})
    } catch (err) {
        next(err)
    }
}


module.exports = {
    userSignup
}
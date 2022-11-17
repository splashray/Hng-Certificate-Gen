const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const {validationResult} = require("express-validator")

const userSignup  = async (req, res, next)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("validation failed");
            error.statusCode = 422;
            error.data = errors.array()
            throw error;
        }

        const name = req.body.name;
        const email = req.body.email;
        const subscribed = (req.body.subscribed) ? req.body.subscribed : false;
        const isAdmin = (req.body.isAdmin) ? req.body.isAdmin : false;
        const password = req.body.password; 
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(401).json({message: "A user already exist with this email!"})
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                console.log(err)
                const error = new Error("account could not be created");
                error.statusCode = 422;
                throw error;
            }
            const newUser = new User({
                name: name,
                email: email,
                password: hash,
                isAdmin: isAdmin,
                subscribed: subscribed
            })
            const createdUser = await newUser.save()
             res.status(200).json({message: "New User has been created.", id: createdUser._id, email: createdUser.email})
        });
    } catch (err) {
        next(err)
    }
}


module.exports = {
    userSignup
}

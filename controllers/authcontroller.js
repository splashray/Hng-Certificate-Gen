const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const secret = crypto.randomBytes(20).toString("hex");

exports.userSignup  = async (req, res, next)=>{
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

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        
        const user = await User.findOne({ email: email })
        if (!user) {
            const error = new Error(
                "A user for this email could not be found!"
            );
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            const error = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id
        }, secret,
        {expiresIn: "24h"}
        )
        res.status(201).json({
            message: "user logged in successfully",
            token: token,
            userId: user._id.toString()
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }

    
}


// module.exports = {
//     userSignup
// }

const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator")
const config = require("../utils/config")


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);


//function to verify user google access token
async function verify(_token) {
    const ticket = await client.verifyIdToken({
        idToken: _token,
        audience: config.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  }


const userSignup  = async (req, res, next)=>{
    try {
        //google signup
        if (req.body.accessToken) {
            const { accessToken } = require(req.body);
            const payload = await verify(accessToken)
            const googleUserId = payload["sub"];
            const email = payload["email"];
            const name = payload["name"];

            //check db if user already exists
            const user = await User.findOne({ email: email })
            if (user) {
                return res.status(401).json({message: "A user already exist with this email!"})
            }

            //if not create new user
            const newUser = new User({
                email: email,
                name: name,
                authenticationType: {
                    google: {
                        uuid: googleUserId
                    }
                }
            })
            const createdUser = await newUser.save()
            res.status(201).json({message: "New User has been created.", id: createdUser._id, email: createdUser.email})
        }

        //Form signup
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("validation failed");
            error.statusCode = 422;
            error.data = errors.array()
            console.log(error.data)
            throw error;
        }

        const name = req.body.name;
        const email = req.body.email;
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
                authenticationType: {
                    form: {
                        password: hash
                    }
                }
            })
            const createdUser = await newUser.save()
             res.status(201).json({message: "New User has been created.", id: createdUser._id, email: createdUser.email})
        });
    } catch (err) {
        next(err)
    }
}


module.exports = {
    userSignup
}

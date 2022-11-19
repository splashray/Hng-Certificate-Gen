const {body} = require("express-validator")

exports.validateSignUp = !body("password") ? [body("email").trim().isEmail().withMessage("Please enter a valid email!").normalizeEmail(), body("password").trim().not().isEmpty(), body("name").trim().not().isEmpty()] : [];
// exports.validateSignUp = [];

const dotenv = require ('dotenv')
dotenv.config()

const config = {
    PORT : process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL,
    AUTH_EMAIL: process.env.AUTH_EMAIL,
    AUTH_PASS: process.env.AUTH_PASS

}
module.exports = config

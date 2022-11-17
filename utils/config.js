const dotenv = require ('dotenv')
dotenv.config()

const config = {
    PORT : process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://0.0.0.0/certawi',

}
module.exports = config;
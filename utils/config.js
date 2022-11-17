const dotenv = require('dotenv')
dotenv.config()

const config = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/todosdb',

}
module.exports = config

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-Parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
const auth = require('./routes/authRouter')
const users = require('./routes/userRouter')
const profile = require('./routes/profileRouter')
const connectDB = require('./database/db')
const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/errorHandler')

//middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome to HNG-Certificate Api')
})

//routes
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/profile', profile)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Connected to port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()

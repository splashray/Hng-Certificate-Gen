const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-Parser')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
const auth = require('./routes/authRouter')
const users = require('./routes/userRouter')
const careers = require('./routes/careerRouter')
const mailingLists = require('./routes/mailingListRouter')
const profile = require('./routes/profileRouter')
const notFound = require('./middlewares/not-found')
const payment = require('./routes/paymentRouter')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
  console.log('Connected to mongodb.');
})
.catch((error)=>{
  console.log(error.reason);
})

//middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Welcome to HNG-Certificate Api')
});

//routes
app.use('/api/auth',auth)
app.use('/api/users',users)
app.use('/api/careers',careers)
app.use('/api/mailinglists',mailingLists)
app.use('/api/payment', payment)
app.use('/api/profile',profile)



app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    })
  })
  
app.use(notFound)


app.listen(config.PORT , ()=>{
    console.log(`connected to backend - ${config.PORT}`);
});
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
const auth = require('./routes/authRouter')
const users = require('./routes/userRouter')
const careers = require('./routes/careerRouter')
const mailingLists = require('./routes/mailingListRouter')
const profile = require('./routes/profileRouter')
const csvUpload = require('./routes/csvUploadRouter')
const certificate = require('./routes/certificateRoute')
const notFound = require('./middlewares/not-found')
const filesPayloadExists = require('./middlewares/filePayLoadExist')
const fileExtLimiter = require('./middlewares/fileExtLimiter')
const fileUpload = require('express-fileupload');


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

// const passport = require("passport");
// require("./passportConfig")(passport);

//middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('Welcome to HNG-Certificate Api')
});

//routes
app.use('/api/auth',auth)
app.use('/api/users',users)
app.use('/api/careers',careers)
app.use('/api/mailinglists',mailingLists)

app.use('/api/profile',profile)

app.use('/api/upload/csv', fileExtLimiter, filesPayloadExists, csvUpload);
app.use('/api/certificate', certificate)

// app.use((err, req, res, next)=>{
//     const errorStatus = err.status || 500
//     const errorMessage = err.message || "Something went wrong!"
//     return res.status(errorStatus).json({
//       success: false,
//       status: errorStatus,
//       message: errorMessage,
//       stack: err.stack,
//     })
//   })
  
// app.use(notFound)



mongoose.connect(config.MONGODB_URL).then(result => {
  app.listen(config.PORT , ()=>{
    console.log(`connected to backend - ${config.PORT}`);
});
}).catch(err => {
  console.log(err)
})
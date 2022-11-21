require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const app = express()

//import coustom middlware
const connectDB = require('./utils/dbConn');

//import custom routes
const csvRouter = require('./routes/csvRouter.js');
const authRouter = require('./routes/authRouter');

const PORT = process.env.PORT || 5000;

connectDB();




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
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(fileUpload())

app.get('/', (req, res) => {
    res.send('Welcome to HNG-Certificate Api')
});

//routes
app.use('/api/auth',auth)
app.use('/api/users',users)
app.use('/api/careers',careers)
app.use('/api/mailinglists',mailingLists)

app.use('/api/profile',profile)

app.use('/api/upload/csv', fileExtLimiter, filesPayloadExists, csvUpload)


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


// app.listen(config.PORT , ()=>{
//     console.log(`connected to backend - ${config.PORT}`);
// });

mongoose.connect(config.MONGODB_URL).then(result => {
  app.listen(config.PORT , ()=>{
    console.log(`connected to backend - ${config.PORT}`);
});
}).catch(err => {
  console.log(err)
})
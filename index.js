require('dotenv').config();
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
const notFound = require('./middlewares/not-found')
const filesPayloadExists = require('./middlewares/filePayLoadExist')
const fileExtLimiter = require('./middlewares/fileExtLimiter')



//middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Welcome to HNG-Certificate Api');
});

//routes

// app.use((err, req, res, next)=>{
//   const errorStatus = err.status || 500
//     const errorMessage = err.message || "Something went wrong!"
//     return res.status(errorStatus).json({
//       success: false,
//       status: errorStatus,
//       message: errorMessage,
//       stack: err.stack,
//     })
//   })
  
  app.use('/api/upload/csv', csvRouter);
  app.use('/api/auth', authRouter);
  


mongoose.connection.once('open', ()=> {
  console.log('Connected to DB')
  app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));
})
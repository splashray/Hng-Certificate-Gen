/* eslint-disable linebreak-style */
const {
  v4: uuid
} = require('uuid')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const userModel = require('./models/userModel')

const app = express();
const download = require('./routes/downloadRouter')
const notFound = require('./middlewares/not-found');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongodb.');
    app.listen(3000, () => {
      console.log(`connected to backend `);
    })
  })
  .catch((error) => {
    console.log(error.reason);
  })
  
// middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(express.json())

app.get('/', (req, res, next) => {
  try {
    userModel.find({}, '-password -__v', (err, users) => {
      if (err) return res.send('error')
      res.json(users)
    })
  } catch (error) {
    next(error)
  }
});

// HOW TO SAVE A SINGLE CERTIFICATE DETAILS TO AN EXISTING USER DATABASE 

// app.post('/upload', async (req, res, next) => {
//   try {
//     const {
//       id,
//       name,
//       studentID
//     } = req.body

//     const collectionID = uuid()

//     const user = await userModel.findById(id)

//     if(!user) return res.send('user not found')

//     // adds certificate record to users data, you can carryout multiple pushes before calling .save()
//     user.records.push({name,
//       studentID,
//     collectionID})

//     user.save((err, data) => {
//       if(err) return res.send(err)
//       res.send({
//         message : "stored to database successfully",
//         id: user._id,
//         collectionID
//       })
//     })
//   } catch (error) {
//     next(error)
//   }
// })

// routes
app.use('/download', download)


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use(notFound);
/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const config = require('./utils/config');
const auth = require('./routes/authRouter');
const users = require('./routes/userRouter');
const profile = require('./routes/profileRouter');
const formUpload = require('./routes/formUploadRouter');
const notFound = require('./middlewares/not-found');

mongoose.set('useCreateIndex', true);
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
<<<<<<< HEAD
  .then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log(error.reason);
  });
=======
.then(()=>{
  console.log('Connected to mongodb.');
})
.catch((error)=>{
  console.log(error.reason);
})

// const passport = require("passport");
// require("./passportConfig")(passport);
>>>>>>> 979016fa2c51fd6765e1ad93e444ac58297d1837

// middleware
app.use(cors());
<<<<<<< HEAD
app.use(express.json());
app.use(bodyParser.json());

=======
app.use(express.json())
app.use(bodyParser.json())
app.use(express.json())
>>>>>>> 979016fa2c51fd6765e1ad93e444ac58297d1837
app.get('/', (req, res) => {
  res.send('Welcome to HNG-Certificate Api');
});

// routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/form-upload', formUpload);

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

<<<<<<< HEAD
app.listen(config.PORT, () => {
  console.log(`connected to backend - ${config.PORT}`);
});
=======
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
>>>>>>> 979016fa2c51fd6765e1ad93e444ac58297d1837

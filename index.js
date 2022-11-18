/* eslint-disable linebreak-style */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//const config = require("./utils/config");
const auth = require("./routes/authRouter");
const users = require("./routes/userRouter");
const notFound = require("./middlewares/not-found");
const teamRoute = require("./routes/teamRouter");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();

const DB = process.env.DATABASE;
mongoose.set("useCreateIndex", true);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("Connection successful");
  });
/*mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to mongodb");
    // start server after database is connected
    app.listen(config.PORT, () => {
      console.log(`connected to backend - ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.reason);
  });*/

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to HNG-Certificate Api");
});

// routes
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/team", teamRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use(notFound);

// app.listen(config.PORT, () => {
//   console.log(`connected to backend - ${config.PORT}`);
// });

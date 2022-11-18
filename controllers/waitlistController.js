const Waitlist = require('../models/waitlistModel');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

// get all contacts
const getWaitlist = async (req,res) => {
  try{
    const waitlist = await Waitlist.find();
    res.status(200).json({
      message: "All Emails",
      waitlist: waitlist,
    });
  } catch (err) {
    console.log({message: err.message});
    res.status(500);
  }
}

// 
const sendEmail =  async (req, res) => {
  try{
    const {email} = await req.body;
    const newEmail = new Waitlist({
      email
    });

    newEmail.save();

    const mail = `
    <p>Thanks for subscribing to our emailing list.</p>
    <p>You will be informed once we have new features.</p>
  `
    // Create Transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN
      }
    });

    // Mail Options To Website Owner
    let mailOptions = {
      from: 'omosiyobo@gmail.com', //Sender address
      to: `${req.body.email}`, // Receiver address
      subject: 'Nodemailer Project',
      text: 'Hi from your nodemailer project',
      html: mail
    };

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Email sent successfully");
        console.log(data);
      }
    });

    res.status(201).json({
      message: "Message sent",
      newContact
    })
  } catch (err) {
    console.log({message: err.message});
    res.status(500);
  }
}

module.exports = {
  getWaitlist,
  sendEmail
}
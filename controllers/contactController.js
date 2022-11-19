const Contact = require('../models/contactModel');
const dotenv = require('dotenv');
dotenv.config();
const config = require('../utils/config')
const nodemailer = require('nodemailer');

// get all contacts
const getContacts = async (req,res) => {
  try{
    const contacts = await Contact.find();
    res.status(200).json({
      message: "All Contacts",
      contacts: contacts,
    });
  } catch (err) {
    console.log({message: err.message});
    res.status(500);
  }
}

// 
const sendContact =  async (req, res) => {
  try{
    const {firstName, lastName, email, phoneNumber, message} = await req.body;
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      message
    });

    newContact.save();

  //   const mail1 = `
  //   <p>You have a new contact request</p>
  //   <h3>Contact Details</h3>
  //   <ul>  
  //     <li>Name: ${req.body.firstName} ${req.body.lastName}</li>
  //     <li>Email: ${req.body.email}</li>
  //     <li>Phone: ${req.body.phoneNumber}</li>
  //   </ul>
  //   <h3>Message</h3>
  //   <p>${req.body.message}</p>
  // `
  //   // Create Transporter
  //   let transporter1 = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: config.AUTH_EMAIL,
  //       pass: config.AUTH_PASS,
  //       // clientId: GOOGLE_CLIENT_ID,
  //       // clientSecret: GOOGLE_CLIENT_SECRET
  //       // refreshToken: GOOGLE_REFRESH_TOKEN
  //     }
  //   });

  //   // Mail Options To Website Owner
  //   let mailOptions1 = {
  //     from: 'omosiyobo@gmail.com', //Sender address
  //     to: 'omosiyobo@gmail.com', // Receiver address
  //     subject: 'Hi From Certawi',
  //     text: 'Hi from Certawi',
  //     html: mail1
  //   };

  //   transporter1.sendMail(mailOptions1, function(err, data) {
  //     if (err) {
  //       console.log("Error: " + err);
  //     } else {
  //       console.log("Email sent successfully");
  //       console.log(data);
  //     }
  //   });

    const mail2 = `
    <p>Your message has been received.</p>
  `
    // Create Transporter
    let transporter2 = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.AUTH_EMAIL,
        pass: config.AUTH_PASS
        // clientId: GOOGLE_CLIENT_ID,
        // clientSecret: GOOGLE_CLIENT_SECRET
        // refreshToken: GOOGLE_REFRESH_TOKEN
      }
    });

    // Mail Options To Website User
    let mailOptions2 = {
      from: 'omosiyobo@gmail.com', //Sender address
      to: `${req.body.email}`, // Receiver address
      subject: 'Hi From Certawi',
      text: 'Hi from Certawi',
      html: mail2
    };

    transporter2.sendMail(mailOptions2, function(err, data) {
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
  getContacts,
  sendContact
}
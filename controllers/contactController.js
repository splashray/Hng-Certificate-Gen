const Contact = require('../models/contactModel');
const dotenv = require('dotenv');
dotenv.config();
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
    const {firstName, lastName, email, phoneNumber} = await req.body;
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber
    });

    newContact.save();

    const mail = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `
    // Create Transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
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
  getContacts,
  sendContact
}
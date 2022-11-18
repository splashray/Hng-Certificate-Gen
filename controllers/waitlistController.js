const Waitlist = require('../models/waitlistModel');
const createError = require('../utils/error');

const { sendMailingEmail } = require("../utils/email");

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

    newEmail.save()
      .then(result=>{
        // handle account verification
          sendMailingEmail(result, res)
      }).catch(err =>{
          console.log(err);
          res.json({status:"FAILED", message:"An error occurred while saving mailing details"})
      })
    

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
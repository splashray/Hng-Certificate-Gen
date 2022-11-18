const User = require('../models/userModel')
const _ = require('lodash');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const {initializePayment, verifyPayment } = require("../utils/paystack");
const { response } = require("express");
const paystack = require("../utils/paystack");
paystack

const pay = async (req, res, next) =>{
    const form = _.pick(req.body,['amount','email','full_name']);
    form.metadata = {
        full_name : form.full_name
    }
    form.amount *= 100;

    initializePayment(form, (err, body) =>{
        if(err){
            // I will write proper erro message
            console.log(err)
            return res.status(404).send(err)
        }

        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    })

}


const callback  = async (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, async (err,body)=>{
        if(err){
            //handle errors appropriately
            console.log(err)
            return res.status(404).send(err)
        }

        response = JSON.parse(body)

        const data = _.at(response.data,['reference', 'amount', 'customer.email', ])
        [reference, amount, email ] = data;
        const filter = {email:email}
        const update = { subscribed:true }
        const user = await User.findOneAndUpdate(filter,update,{new:true} )
        if(!user){
            return res.status(404).send(err)
        }
        res.redirect('/download')

    })

}

module.exports = {pay, callback}
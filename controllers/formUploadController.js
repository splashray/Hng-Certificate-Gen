/* eslint-disable linebreak-style */
const {
    v4: uuid
} = require('uuid')
const {
    validationResult
} = require('express-validator');
const Data = require('../models/Data')
const userModel = require('../models/userModel')

// @desc    downloads certifcate records from User.collections array
// @route   POST /api/download
// @access  Private

exports.getUserData = async (req, res, next) => {
    try {
        const {
            email, groupID
        } = req.body

        if(!groupID){
        userModel.findOne({email}).
        populate('collections').exec((err, data) => {
            if (err) {
                return res.status(404).send('user not found')
            }
            res.status(200).json(data.collections.map( item => {
                const {
                    name, award, description, date, signed, name_of_organization
                } = item

                return {
                    name, award, description, date, signed, name_of_organization
                }

            }))
        })
    }
    } catch (error) {
        next(error)
    }
}
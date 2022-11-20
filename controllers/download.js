const userModel = require('../models/userModel')

// @desc    downloads certifcate records from User.records array
// @route   POST /api/download
// @access  Private

exports.getUserData = async (req, res, next) => {
    try {
        userModel.findOne({
            // this could be paased along through jwt for logged in use case
            _id: req.body.id
        }, (err, data) => {
            try {
                res.send(data.records.filter(item => item.collectionID === req.body.collectionID))
            } catch (error) {
                next(error)
            }
        })
    } catch (error) {
        next(error)
    }
}
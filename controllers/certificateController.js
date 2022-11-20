const Certificate = require( "../models/certificateModel")
const createError = require('../utils/error')


const getCertificate = async (req, res, next) => {
    const { id } = req.params
    const certificate = await Certificate.findOne({ _id: id })

    if (!certificate) {
        return next(createError(404, `Certificate not found`))
    }
    res.status(200).json({ response: certificate })
}

module.exports ={
  getCertificate
}

const CustomAPIError = require('../errors/customError')
const errorHandler = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value`
    //change status code to 400: BadRequest
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.msg = `Item found with id: ${err.value} not found`
    customError.statusCode = 404
    //change status code to 404: NotFound
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandler

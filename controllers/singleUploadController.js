const Certificate = require('../models/certificateModel');
const { isValidInput } = require('../utils/singleValidation');

const createSingleCertificate = async (req, res, next) => {
  try {
    if (!isValidInput(req.body)) {
      return res
        .status(400)
        .json({
          Error: 'Invalid input for certificate',
          expected_request: {
            description: 'description of certificate',
            name: 'name of student',
            organization: 'name of organization',
            award: 'award type',
            signed: 'signature',
            date: 'date certificate was awarded',
          },
        })
        .end();
    }

    //copy the input from the user
    const certificateBody = { ...req.body };

    // Save the record to the database
    const certificate = new Certificate({
      records: [certificateBody],
    });
    certificate.save();

    // send to the client
    res
      .status(201)
      .json({
        result: certificate,
        message: `Certificate created successfully`,
      })
      .end();
  } catch (error) {
    next(error);
  }
};

module.exports = { createSingleCertificate };

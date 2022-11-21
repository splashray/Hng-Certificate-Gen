const csvToJson = require('csvtojson');
const fs = require('fs');
const { isValidJsonOutput } = require('../utils/validation');
const Certificate = require('../models/certificateModel');
const createError = require('../utils/error');

const createCertificate = async (req, res, next) => {
  try {
    //get userId
    const userId = req.user || '6378ec4ec647bd3be0af4511'; //placeholder userId
    //get the csv file
    const file = req.file;
    if (file) {
      //create buffer for the csv file
      const buffer = fs.readFileSync(file.path);

      // Convert the buffered csv data to readable format
      const csvData = Buffer.from(buffer).toString();

      // convert csvData to JSON and send back to client
      const jsonOutput = await csvToJson().fromString(csvData);
      jsonOutput.map((key) => {
        if (!key.name) {
          const name = `${key.firstname} ${key.lastname || ''}`;
          key.name = name.trim();
        }
        return key;
      });

      // Csv file does not have required content/format
      if (!isValidJsonOutput(jsonOutput)) {
        return res
          .status(400)
          .json({ message: 'Invalid input from uploaded csv file' })
          .end();
      }

      // Save the record to the database
      const certificate = new Certificate({
        records: jsonOutput,
        userId,
      });

      certificate.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        } else {
          console.log(result);
          res
            .status(201)
            .json({
              result,
            })
            .end();
        }
      });
    } else {
      res.status(400).json({ message: 'No csv file was uploaded' }).end();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { createCertificate };

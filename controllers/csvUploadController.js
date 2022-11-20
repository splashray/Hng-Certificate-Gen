const csvToJson = require("csvtojson")
const { isValidJsonOutput } = require("../utils/validation")
const Certificate = require('../models/certificateModel')

const createCertificate = async(req, res, next) =>{
    try {
        const files = req.files;
  
        if (files) {
          const file = files.file;
          
          // Convert the buffered csv data to readable format
          const csvData = Buffer.from(file.data).toString();
      
          // convert csvData to JSON and send back to client
          const jsonOutput = await csvToJson().fromString(csvData);
      
          // Csv file does not have required content/format
          if(!isValidJsonOutput(jsonOutput)){
            
            return res.status(400).json({ message: 'Invalid input from uploaded csv file' }).end();
      
          }
          
          // Save the record to the database
          const certificate = new Certificate({
            records: jsonOutput,
          })

          certificate.save();

          return res.status(201).json({result: certificate, message:`Certificate record created successfully`}).end();

        }
      
        return res.status(400).json({message: "No csv file was uploaded"}).end();
      
        
    } catch (err) {
            next(err)
    }
}

module.exports = { createCertificate };
const path = require("path");
const fs = require("fs");
const csvToJson = require("csvtojson");
const { isValidJsonOutput } = require("../utils/validation");
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const handleCsv = async (req, res) => {
  const files = req.files;
  
  if (files) {
    const file = files.file;
    
    // Convert the buffered csv data to readable format
    const csvData = Buffer.from(file.data).toString();

    // convert csvData to JSON and send back to client
    const jsonOutput = await csvToJson().fromString(csvData);

    if(!isValidJsonOutput(jsonOutput)){
      
      return res.status(400).json({ message: 'Invalid input from uploaded csv file' }).end();

    }

    const authorizationHeader = req.headers.authorization;

    if( !authorizationHeader ){
      return res.status(401).json({message: "User unauthorized"}).end();
    }

    const token = authorizationHeader.split(" ")[1];

    const userId = jwt.decode(token).id;

    // Generate an ID for the collection
    const collectionID = uuidv4();

    // Append the collectionID to each json Object
    const jsonWithCollectionID = jsonOutput.map(jsonRecord => ({...jsonRecord, collectionID}));

    // Save the jsonOutput to DB
    await User.findByIdAndUpdate(userId, {$push: {records: { ...jsonWithCollectionID } }});

    return res.status(200).json( jsonWithCollectionID ).end();
  }

  return res.status(400).json({message: "No csv file was uploaded"}).end();
};

module.exports = { handleCsv };

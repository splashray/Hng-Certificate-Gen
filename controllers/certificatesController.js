const User = require("../models/certificateModel");
const jwt = require("jsonwebtoken");

const getAllCertificates = async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(403).json({ error: "No credentials sent!" });
    }
  
    const token = auth.split(" ")[1];
    const { userId } = jwt.decode(token);
    const user = await User.findOne({ userId }).exec();
    const certificates = user.records;
  
    res.status(200).json(certificates);
  };
  
  module.exports = {
    getAllCertificates,
  };
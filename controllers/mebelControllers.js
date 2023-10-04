const mebelModel = require("../models/mebel.Model");


const getMebels = async (req, res) => {
    try {
      const mebels = await mebelModel.find();
  
      res.status(200).json({
        message:"Success",
        mebels
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  };

  module.exports = {
    getMebels
  }
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

const getMebelById = async (req, res) => {
    try {
        const id =  req.params.id
      const mebel = await mebelModel.find({id});
  
      res.status(200).json({
        message:"Success",
        mebel
      });
    } catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  };

const addMebel = async (req, res) => {
    try {
        const images = []
        req.files.img_list.map(i => {
          images.push(i.path)   
        })

        let date = {
            title: req.body.title,
            old: req.body.old,
            new: req.body.new,
            mebel: req.body.mebel,
            img_list: images,
            img: req.files.img[0].path,
            size: req.body.size,
            name: req.body.name,
            subtitle: req.body.subtitle,
            description: req.body.description
        }

        const mebel = await mebelModel.create(date)
        res.status(201).json({
            message:"Created",
            mebel
        })
        
    } catch (error) {
        res.status(400).json({
            error:"Your request could not be processed. Please try again."
        })
    }
}


  module.exports = {
    getMebels,
    getMebelById,
    addMebel
  }
const mebelModel = require("../models/mebel.Model");

const fs = require("fs")
const path = require("path")


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

const updateMebel = async (req, res) => {
    try {
        const mebel = await mebelModel.findById(req.params.id)
        const query = { _id: req.params.id };
        if(mebel) {
            let oldImgList = mebel.img_list
            let oldImg = mebel.img
            
            if(req.files){
                req.files.img_list.map(i => {
                  oldImgList.push(i.path)   
                })
                mebel.img_list.map((item => {
                    fs.unlink(path.join(__dirname, "../", item), (err, data) => {
                        if(err){
                            console.log(err)
                        } else {
                            console.log("Remove image list in mebel")
                        }
                    })
                }))
                oldImg = req.files.img[0].path
                fs.unlink(path.join(__dirname, "../", mebel.img), (err, data) => {
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Remove image in mebel")
                    }
                })
            }



        const mebel = await mebelModel.findOneAndUpdate(query, 
            {
                title: req.body.title,
                old: req.body.old,
                new: req.body.new,
                mebel: req.body.mebel,
                img_list: oldImgList,
                img: oldImg,
                size: req.body.size,
                name: req.body.name,
                subtitle: req.body.subtitle,
                description: req.body.description
            }, {
            new: true
        });
        res.status(201).json({
            message:"Created",
            mebel
        })
    } else {

    }
    } catch (error) {
        res.status(400).json({
            error:"Your request could not be processed. Please try again."
        })
    }
}

const deleteMebel = async (req, res) => {
    try {
        const mebel = await mebelModel.findById(req.params.id)
        if(mebel) {
            
            mebel.img_list.map((item => {
                fs.unlink(path.join(__dirname, "../", item), (err, data) => {
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Remove image list in mebel")
                    }
                })
            }))
            
                fs.unlink(path.join(__dirname, "../", mebel.img), (err, data) => {
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Remove image in mebel")
                    }
                })
                await mebelModel.deleteOne({ _id: req.params.id });
                res.status(201).json({
                    message:"deleted mebel",
                })
            } else {
                res.status(404).json({
                    message:"Mebel Not Found"
                })
            }
    } catch (error) {
        res.status(400).json({
            error:"Your request could not be processed. Please try again."
        })
    }
}



  module.exports = {
    getMebels,
    getMebelById,
    addMebel,
    updateMebel,
    deleteMebel
  }
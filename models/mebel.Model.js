const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// User Schema
const MebelSchema = new Schema({
  title: {
    type: String
  },
 
  old: {
    type: Number
  },
  new:{
    type: Number
  },
  mebel:{
    type: String
  },
  img_list: [String],
  img: {
    type: String
  },
  size: {
    type: String
  },
  name:{
    type: String
  },
  subtitle:{
    type: String
  },
  description:{
    type: String
  }
});

module.exports = Mongoose.model('Mebel', MebelSchema);
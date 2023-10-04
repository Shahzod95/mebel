const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  username: {
    type: String
  },
 
  password: {
    type: String
  }
});

module.exports = Mongoose.model('User', UserSchema);
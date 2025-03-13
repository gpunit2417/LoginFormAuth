const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const GoogleUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    profilePic: String,
  });
  
  const User = mongoose.model("GoogleUser", GoogleUserSchema);
  module.exports = User
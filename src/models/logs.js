const mongoose = require('mongoose');


const logSchema = new mongoose.Schema({
  method:{
    type:String,
    required:true,
    trim:true
  },
  url:{
    type:String,
    required:true,
    trim:true
  },
  statusCode:{
    type: Number,
    required:true,
    trim:true
  }
},{collection:"Logs",timestamps:true})

module.exports = mongoose.model('Log', logSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  reset : {
    code:{
      type:String,
      default:null
    },
    time:{
      type:String,
      default:null
    }
  },
  role:{
    type:String,
    default:"user"
  }
},{collection:"Users",timestamps:true});


userSchema.methods.toJSON = function(){
  let user = this.toObject()
  delete user.password
  delete user.createdAt
  delete user.updatedAt
  delete user.__v
  return user
}

module.exports = mongoose.model('User',userSchema)

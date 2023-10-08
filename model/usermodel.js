const mongoose = require("mongoose")
const Schema =  mongoose.Schema
const userSchema = new Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    hash:{type:String,required:true},
    fullname:{type:String,required:true},
    account: [
        {
          platform: String,
          token: String,
        }
    ]
})

module.exports = mongoose.model("Users",userSchema)
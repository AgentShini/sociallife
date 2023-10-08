const mongoose = require('mongoose')
const Schema = mongoose.Schema

var studentSchema = new Schema({
    Name:String,
    Age:Number,
    Department:String
})



module.exports = mongoose.model("Student",studentSchema)

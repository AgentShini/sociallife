const mongoose = require('mongoose')

var studentSchema = mongoose.Schema({
    Name:String,
    Age:Number,
    Department:String
})

var studentModel = mongoose.model("Student",studentSchema)

module.exports = {
    studentModel
}
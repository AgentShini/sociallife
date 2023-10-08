var express = require('express')
var router = express.Router()
const studentModel = require('../model/studentModel')

router.get("/All",async (req,res)=>{
  const response = await studentModel.find()
  res.send({status:200,data:response})
})


router.post("/Create",(req,res)=>{

const student = new studentModel({
    Name:req.body.name,
    Age:11,
    Department:"CSC"
})

student.save()

res.send(student)

})
    router.get("/Some",async(req,res)=>{
        const query = req.query.age
        const students = await studentModel.find({Age:query})
        res.send({status:200,data:students})
        })

        router.delete("/Some",async(req,res)=>{
            const query = req.query.age
            const students = await studentModel.findOneAndDelete({Age:query})
            res.send({status:200,message:"Student Deleted"})
            })

            router.put("/Some",async(req,res)=>{
                const query = req.body.age
                const students = await studentModel.updateMany({Age:115},{Age:query})
                res.send({status:200,message:"Student Updated"})
                })
        

module.exports = router;
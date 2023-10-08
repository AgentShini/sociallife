const express = require("express")
const router = express.Router()
const User = require("../model/usermodel")
const bcrypt = require("bcrypt")

router.post("/register",async(req,res)=>{
  
const {email,password,fullname,account,username} = req.body
const encrypted = await bcrypt.hash(password,10)

User.create({
   email:email,
   hash:encrypted,
   fullname:fullname,
   account:account,
   username:username
}).then(()=>{
   res.send("Success");
}).catch((err)=>{
res.status(400).json({data:err})
})

})




module.exports = router
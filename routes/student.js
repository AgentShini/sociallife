var express = require('express')
var router = express.Router()

router.get("/All",(req,res)=>{
res.send("All Students")
})

router.put("/Create",(req,res)=>{
    res.send("Created Student")
    })

    router.get("/Some",(req,res)=>{
        res.send("One Student")
        })

module.exports = router;
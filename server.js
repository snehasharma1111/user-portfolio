const express = require("express")

const app = express()

app.listen(3000, ()=>{
    console.log("server started at 3000")
})

app.get('/health', (req,res)=>{
    res.send("Healthy")
})
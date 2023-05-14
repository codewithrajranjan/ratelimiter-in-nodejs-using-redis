const express = require("express")
const rateLimiter = require("./rate-limiter")


const app = express()

app.use(rateLimiter.rateLimiter)

app.get("/ping", async (req, res)=>{
    res.status(200).json({
        "success": true,
        "message": "pong"
    })
})

app.listen(7005, function (){
    console.log("server started at port 7005")
})
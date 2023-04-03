const express=require("express")
const app=express()
const bodyparser=require('body-parser')
const router=require('./route/route')

app.use(bodyparser.json())
const mongoose=require("mongoose")


mongoose.connect('mongodb+srv://souravbauri:Alluarya1234@cluster0.ydupgt5.mongodb.net/tweeter',{useNewUrlParser:true}).then(()=>{
  console.log("mongoDb is connected")
}).catch((err)=>{
  console.log(err)
});

app.use('/',router)

app.listen(3000,(err)=>{
if(err){console.log(err)}
else{console.log("server is running")}
})

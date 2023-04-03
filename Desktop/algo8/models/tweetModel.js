const mongoose=require('mongoose')
const objectId= mongoose.Schema.Types.ObjectId

const tweetModel=new mongoose.Schema({
    userId:{type:objectId,ref:"user"},
    tweets:{type:String,required:true},
    likes:{type:Number,default:0},
    createdAt:Date.now()
},{timestamps:true})
module.exports=mongoose.model('tweet',tweetModel)
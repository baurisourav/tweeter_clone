const mongoose=require('mongoose')

const followerModel=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    followedBy:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'user'}
},{timestamps:true})


module.exports=mongoose.model('followers',followerModel)
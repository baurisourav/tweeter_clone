const mongoose=require('mongoose')

const userModel=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    // followers:[{type:mongoose.Schema.Types.ObjectId,}],
    // following:[{type:mongoose.Schema.Types.ObjectId,}],
    followersCount:{type:Number,default:0},
    followingCount:{type:Number,default:0},
    joinedAt:Date.now()
},{timestamps:true})

module.exports=mongoose.model('user',userModel)
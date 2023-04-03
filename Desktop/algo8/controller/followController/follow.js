const userModel=require('../../models/userModel')
const followerModel=require('../../models/followerModel')


const follow=async function(req,res){
    const data=await followerModel.create(req.body)
    // return res.status(200).send({msg:"success",data:data})
    const user=await userModel.findOne({_id:data.followedBy})
    user.followersCount+=1
    user.save()
    const User=await userModel.findOne({_id:data.userId})
    User.followingCount+=1
    User.save() 
}

const displayFollowers=async function(req,res){
    const followersId=await followerModel.find({userId:req.params.id},{followedBy:1,_id:0,userId:0})
    return res.status(200).send({msg:"successful",data:followersId})
}

module.exports={follow,displayFollowers}
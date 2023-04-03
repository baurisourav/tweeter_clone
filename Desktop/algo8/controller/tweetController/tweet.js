const tweetModel=require('../../models/tweetModel')


const createTweet=async function(req,res){
    const data=await tweetModel.create(req.body)
    return res.status(201).send({msg:"tweet has been creted successfully"})
}

const deleteTweet=async function(req,res){
    const tweet=tweetModel.findOne({_id:req.params.id})
    tweet.remove()
    return res.status(200).send({msg:"tweet deleted successfully"})
}

const likeTweet=async function(req,res){
    const tweet=await tweetModel.findOne({_id:req.params.id})
    tweet.likes+=1
    tweetModel.save()
}
const displayTweet=async function(req,res){
    const tweets=await tweetModel.find()
    return res.status(200).send({msg:"success",data:tweets})
}

const displayMyTweets=async function(req,res){
    const myTweets=await tweetModel.find({userId:req.params.id})
    return res.status(200).send({msg:"success",data:myTweets})
}


module.exports={createTweet,deleteTweet,likeTweet,displayTweet,displayMyTweets}
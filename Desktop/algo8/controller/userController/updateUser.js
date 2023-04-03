
const userModel=require('../../models/userModel')


const updateUser=async function(req,res){
    const user=await userModel.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
    return res.status(200).send({msg:"success",data:user})
}
module.exports={updateUser}
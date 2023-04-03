const userModel=require('../../models/userModel')
const nodemailer=require('nodemailer')

const register=async function(req,res){
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    req.body.password=hashedPassword
    const data=await userModel(req.body)
   return res.status(201).send({msg:'registeration successfull',data:data})
    
}


const login=async function(req,res){
    const data=await userModel.findOne({email:req.body.email})
    if(!data){
       return res.status(400).send({msg:"emailId is not registered"})
    }
    if(await bcrypt.compare(req.body.password,data.password)){
        let token = jwt.sign({ userId: data._id, name:user.name }, "SecretKey", {
            expiresIn: "2d",
          })
        
          return res.status(200).send({status: true, message: "User login successfully",
              data: { userId: data._id, name:user.name, token: token },
            })
    }
    else{
        return res.status(400).send({msg:"password is invalid"})
    }
}



const sendresetPasswordMail = async(name, email, token) => {
    try {
       const transporter =   nodemailer.createTransport({
             host : "smtp.gmail.com",
             port : 587,
             secure : false,
             requireTLS : true,
             auth : {
                 user : "sourav.bauri95@gmail.com",
                 pass : "please paste your own password"
             }
         });

         const mailOptions = {
             from : "sourav.bauri95@gmail.com",
             to : email,
             subject : 'For reset password',
             html : '<p>  hi '+name+' ,please copy the link and <a href="http://127.0.0.1:3000/api/reset-password?token='+token+'"> reset your password </a>'
         }
         transporter.sendMail(mailOptions ,function(error ,info){
                    if(error){
                       console.log(error);
                    } else {
                     console.log("Mail has been sent :-", info.response);
                    }
         });

    }catch(err){
     return res.status(400).send({status:false ,message : err.message});
 }
}




const forget_password = async(req ,res) => {
    try {
        let data = req.body;
        let {email} = data;
        if(Object.keys(data).length == 0) return res.status(400).send({status:false ,message:"plss put some data in the body"});

        if(!isValid(email) || !isValidEmail(email))  return res.status(400).send({status:false, message:"plss put the email or put a valid email"});

         const userdata = await usermodle.findOne({email})
        
         if(userdata){
            const randomString = randomstring.generate();
            const newdata = await usermodle.updateOne({email} ,{$set:{token:randomString}});
            sendresetPasswordMail(userdata.Name,userdata.email,randomString);  

            res.status(200).send({status:true ,message: "please check your email and reset the password"})
         }else {
            return res.status(404).send({status:true ,message : "this email does not exist"});
         }

    }catch(error){
        return res.status(400).send({status:false ,message : error.message});
    }
}

module.exports={register,login,forget_password}
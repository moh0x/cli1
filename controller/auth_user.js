const {User} = require('../model/auth_user')
const httpStatus = require('../constant/httpStatus')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const cloudinary=require( "cloudinary").v2;
const signUp =async(req,res)=>{
    try {
        const valid = validationResult(req)
        if (!valid.isEmpty()) {
          return  res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":valid['errors'][0].msg});
        }
        const {username,email,password,role,phoneNumber,addrese} = req.body
              
        const userEmail = await User.findOne({email:email});
        const userName = await User.findOne({username:username});
        if (userEmail || userName) {
          return  res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":"user already exist"})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword =await bcryptjs.hash(password,salt)
        const token = jwt.sign({email:email,username:username},"token")
        const newUser = new User({
            username:username,
            email:email,
            password:hashPassword,
            token:token,
            role:role,
            phoneNumber:phoneNumber,
            addrese:addrese
        })
        await newUser.save()  
              res.status(200).json({"status":httpStatus.SUCCESS,"data":newUser})     
    } catch (error) {
        console.log(error);
          res.status(400).json({"status":httpStatus.ERROR,"message":"error"})  
    }
}
const login =async(req,res)=>{
    try {
        const valid = validationResult(req)
        if (!valid.isEmpty()) {
          return  res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":valid['errors'][0].msg});
        }
        const {email,password} = req.body
        const user = await User.findOne({email:email});
        if (!user) {
          return  res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":"user does not exist"})
        }
        const matchPassword =await bcryptjs.compare(password,user.password)
        if (matchPassword == false) {
            return  res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":"password not match"})
        } 
              res.status(200).json({"status":httpStatus.SUCCESS,"data":user})     
    } catch (error) {
        console.log(error);
          res.status(500).json({"status":httpStatus.ERROR,"message":"error"})  
    }
}
const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
const updateProfile =  async (req, res) => {
	try {
		const token = req.headers.token;
    const {profilePic} = req.body;
    const userId = req.body.userId;
    const user = await User.findOne({token:token},{password:false})
    if (!profilePic) {
      return res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":"profilePic is required"})
    }
  const uploadRespone =  await cloudinary.uploader.upload(profilePic)
  await User.findByIdAndUpdate(user._id,{ 
    $set:{
      profileImg:uploadRespone.secure_url
    }
  })
  res.status(200).json({"status":httpStatus.SUCCESS,"data":user})  
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
const userInfo = async (req,res)=>{
  try {
    const token = req.headers.token;
    const user = await User.findOne({token:token},{password:false})
       res.status(200).json({"status":httpStatus.SUCCESS,"data":user})
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {signUp,login,logout,updateProfile,userInfo}
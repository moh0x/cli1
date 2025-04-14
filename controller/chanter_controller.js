const httpStatus = require('../constant/httpStatus')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const { Chanter } = require('../model/chanter_model')
const { User } = require('../model/auth_user')
const cloudinary=require( "cloudinary").v2;
const addChanter =async(req,res)=>{
    try {
        const valid = validationResult(req)
        if (!valid.isEmpty()) {
          return  res.status(400).json({"status":httpStatus.FAIL,"data":null,"message":valid['errors'][0].msg});
        }
        const {reference,addrese,details,type} = req.body
        const token = req.headers.token;
        const user = await User.findOne({token:token});
        const newChanter = new Chanter({
            addrese:addrese,
            reference:reference,
            details:details,
            type:type,
            userId:user._id
        })
        await newChanter.save()  
              res.status(200).json({"status":httpStatus.SUCCESS,"data":newChanter})     
    } catch (error) {
        console.log(error);
          res.status(400).json({"status":httpStatus.ERROR,"message":"error"})  
    }
}

const updateProfile =  async (req, res) => {
	try {
    const chanter = await Chanter.findOne({_id:req.body._id})
    const {sacsOne,sacsTwo,sacsThree,typeBags} = req.body           
  await Chanter.findByIdAndUpdate(chanter._id,{ 
    $set:{
      sacsOne:sacsOne ?? chanter.sacsOne,
      sacsTwo:sacsTwo ?? chanter.sacsTwo,
      sacsThree:sacsThree ?? chanter.sacsThree,
	    typeBags:typeBags ?? chanter.typeBags,
    }
  })
  res.status(200).json({"status":httpStatus.SUCCESS,"data":chanter})  
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
const chanterInfo = async (req,res)=>{
  try {
    const chanterId = req.params.id;
    const chanter = await Chanter.findOne({_id:chanterId});
        res.status(200).json({"status":httpStatus.SUCCESS,"data":chanter})
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const chanties = async (req,res)=>{
    try {
	    const token = req.headers.token;
      const user = await User.findOne({token:token},{password:false})
      const chanties = await Chanter.find({userId:user._id});
      res.status(200).json({"status":httpStatus.SUCCESS,"data":chanties})
    } catch (error) {
	    console.log(error)
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
module.exports = {chanterInfo,addChanter,updateProfile,chanties}

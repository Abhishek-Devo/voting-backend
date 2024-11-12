const User=require('../models/user')
const bcrypt = require('bcryptjs');
const Candidate=require('../models/candidate')

//get user profile
exports.getUserProfile=async(req,res)=>{
    try{
        const userId = req.userId;
        console.log(userId);
        const user=await User.findById(userId).select('-password')
        res.json(user);
    }
    catch(error){
        res.status(500).json({
            message:"error fetching user profile",error
        });  
        console.log(error)      
    }
};

//change password
exports.changePassword=async(req,res)=>{
    try {
        const user=await User.findById(req.userId);
        const {oldPassword,newPassword}=req.body;
        const isMatch=await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"incorrect old password provided"                
            });
        }

        //if old password matched then
        user.password =await bcrypt.hash(newPassword,10);
        await user.save();

        res.json({
            message:"password changed successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Error changing password",
            error
            }); 
        console.log(error)       
    }
}
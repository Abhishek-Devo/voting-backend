//authentication routes where users can sign up and log in.
const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User = require('../models/user');
const JWT_SECRET=process.env.JWT_SECRET;
//sign up route
exports.signup=async(req,res)=>{
    try{
        const {name,age,address,aadhar,password,email,mobile}=req.body;
        console.log('Received data:', req.body); // Debug line
    

        // Validate required fields
        if (!name || !age || !address || !password || !aadhar) {

            console.log('Missing fields:', { // Debug line
                name: !name,
                age: !age,
                address: !address,
                password: !password,
                aadhar: !aadhar
            });

            return res.status(400).json({ 
                message: 'Please provide all required fields',
                missing: { // This helps identify which fields are missing
                    name: !name,
                    age: !age,
                    address: !address,
                    password: !password,
                    aadhar: !aadhar
                }
            });
        }
        //checking if user already exist or not
        // Check if user already exists
        const existingUser = await User.findOne({ aadhar });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this Aadhar already exists' });
        }

        //hash the password
        const hashedPassword=await bcrypt.hash(password,10);

        //create a new user
        const user=new User({
            name,
            age,
            address,
            password:hashedPassword,
            aadhar,
            email,
            mobile,
            role:'voter',
        });

        //saving your to db
        await user.save();
        console.log("saved user ",user)

        return res.status(201).json({message:'User created successfully'});
    } 
    catch(error){
        return res.status(500).json({
            message:"Error creating User",
            error:error.message
        });
    }
}

//route to log in a user
exports.login=async(req,res)=>{
    try{
        const {aadhar,password}=req.body;
        //console.log(req.body)

        //find user by aadhar number
        const user=await User.findOne({aadhar:aadhar});
        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        //compare password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid password'});
        }
        //generate a jwt token if the password is correct
        const token=jwt.sign({
            userId:user._id,
            role:user.role
        },JWT_SECRET,{expiresIn:'1h'})

        //send the token to the client
        return res.json({
            message:"login successfull",token,role:user.role
        })
    } catch(error){
        console.log("login error",error)
        return res.status(500).json({
            message:"Error logging in user",
            error:error.message});
    }
}

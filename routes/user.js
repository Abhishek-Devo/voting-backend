const express = require('express');
const userController=require('../controllers/userController')
const verifyToken=require('../middleware/authMiddleware');

const router=express.Router();

//get user info
router.get('/profile',verifyToken,userController.getUserProfile);

//change user password
router.put('/profile/password',verifyToken,userController.changePassword);


module.exports=router;
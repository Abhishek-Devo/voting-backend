const express=require('express')
const authController=require('../controllers/authController')

const router=express.Router();
//signup route
router.post('/signup',authController.signup)

//login route
router.post('/login',authController.login)

module.exports=router;

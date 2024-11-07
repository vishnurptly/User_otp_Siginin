const express =require('express')
const router =express.Router()
const {signUpUser,signInUser,verifyOtp} =require('../controller/UserController')


router.post('/signup',signUpUser);
router.post('/signin',signInUser);
router.post('/verifyOtp',verifyOtp);




module.exports=router
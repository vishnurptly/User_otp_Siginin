const express =require('express')
const router =express.Router()
const {signUpUser,signInUser,verifyOtp,refreshAccessToken} =require('../controller/UserController')


router.post('/signup',signUpUser);
router.post('/signin',signInUser);
router.post('/verifyOtp',verifyOtp);
router.post('/refreshtoken',refreshAccessToken)



module.exports=router
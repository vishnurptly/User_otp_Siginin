const express =require('express')
const router =express.Router()
const {signUpUser,signInUser,verifyOtp,refreshAccessToken} =require('../controller/UserController')
const {googleLogin,googleCallback} = require("../controller/authController/AuthController");

router.post('/signup',signUpUser);
router.post('/signin',signInUser);
router.post('/verifyOtp',verifyOtp);
router.post('/refreshtoken',refreshAccessToken)
router.get("/auth/google", googleLogin);
router.get("/auth/google/callback", googleCallback);



module.exports=router
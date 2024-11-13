const bcrypt = require("bcrypt")
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const SignUpModel =require('../model/SignUpModel')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Token = require('../model/Token')
const { generateAccessToken, generateRefreshToken } = require('./auth/Auth');
dotenv.config();

const REFRESH_SECRET_KEY="a60327222ffaa884573490fc0574d69f3f5d1925a98479fb4ef184ebc99fab84cbb9edcc41434b58a07b66188a75152916ed7b46b2031afa5b5c0f046cacb726"



const EMAIL_USER="rpgroupofnode@gmail.com"
const EMAIL_PASS="xoct zgsr ktix qxas"


const signUpUser = async (req,res) => {
    const {email,password} =req.body
    
    try {
       
        const checkEmail =await SignUpModel.findOne({email});
       
        if(!checkEmail){
            const hashedpassword = await bcrypt.hash(req.body.password,10);
            const user = {email:req.body.email,password:hashedpassword}
            const newUser= new SignUpModel(user);
            newUser.save();
            return res.status(200).json({msg:'Signup  Successfully'});
            
        }
        return res.status(400).json({ msg: 'Email is already in use'});
    } catch (error) {
        return res.status(500).json({msg:"Error While siging up user"});
    }
}

const signInUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await SignUpModel.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Email not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Password does not match" });

        // Step 1: Generate an OTP
        const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
      
        // Store the OTP and an expiration time
        user.otp = otp;
        user.otpExpires = Date.now() + 3 * 60 * 1000; // OTP expires in 3 minutes
        await user.save();
        

        // Step 2: Send OTP to user's email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,  // Use STARTTLS
            auth: {
              user: EMAIL_USER,  // Your Gmail address
              pass: EMAIL_PASS  // App password (if 2FA is enabled)
            },
          });
       
        try {
            await transporter.sendMail({
                from:EMAIL_USER,
                to: user.email,
                subject: "Your OTP Code",
                text: `Your OTP code is ${otp}`,
            });
            console.log("OTP sent to email:", otp);
            
        

        } catch (error) {
            console.error("Error sending email:", error);
        }

        res.status(200).json({ msg: "OTP sent to email. Please verify to continue." });

    } catch (error) {
        res.status(500).json({ msg: "Error during login" });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await SignUpModel.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });
        console.log(user)

        //Check if OTP matches and if it’s not expired
        if (user.otp !== parseInt(otp) || Date.now() > user.otpExpires) {
            return res.status(400).json({ msg: 'Invalid or expired OTP' });
        }

       

        // OTP is valid; proceed to generate tokens and mark the user as verified
        user.verified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const saveToken = new Token({ token: refreshToken, userId: user._id });
        await saveToken.save();


        res.json({ accessToken, refreshToken, });

    } catch (error) {
        res.status(500).json({ msg: "Error during OTP verification" });
    }
};

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ msg: "Refresh token required" });

    try {
        
        const tokenInDb = await Token.findOne({ token: refreshToken });
        if (!tokenInDb) return res.status(403).json({ msg: "Invalid refresh token" });
        console.log('token find')

        const decoded = jwt.verify(refreshToken,REFRESH_SECRET_KEY);
        console.log('token verify')
        const accessToken = generateAccessToken(decoded);

        
        res.status(200).json({ token: accessToken });
        console.log("Token verified and access token generated");

    } catch (error) {
        res.status(500).json({ msg: "Error refreshing token" });
    }
};




module.exports={signInUser,signUpUser,verifyOtp,refreshAccessToken}
const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
   
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: Number },               // OTP code
    otpExpires: { type: Number },         // Timestamp when OTP expires
});


const SignUpModel = mongoose.model('signup', signupSchema);

module.exports = SignUpModel;
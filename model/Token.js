const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
   
    token: {
        type: String,
        required: true,
        unique: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '2d' // Automatically removes the token after 2 days
    }
});

const Token = mongoose.model('token', TokenSchema);

module.exports = Token;
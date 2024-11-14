const jwt = require('jsonwebtoken');


// Generate an access token with a shorter expiration time (e.g., 15 minutes)
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: '15m' } // Token expires in 15 minutes
    );
};

// Generate a refresh token with a longer expiration time (e.g., 3 days)
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: '3d' } // Token expires in 3 days
    );
};

module.exports = { generateAccessToken, generateRefreshToken };

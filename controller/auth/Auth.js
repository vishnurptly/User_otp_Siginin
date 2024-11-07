const jwt = require('jsonwebtoken');

// Load secret keys from environment variables for security
const ACCESS_SECRET_KEY="de37bbab03b0380009e4b2f9c6fa6dcf95ae3acfc63125ce7b580d8d490eb6f92579843a4ce44011998dbec04fab568e5de224b042b2c2cf284acfbe03f1f4a6"
const REFRESH_SECRET_KEY="a60327222ffaa884573490fc0574d69f3f5d1925a98479fb4ef184ebc99fab84cbb9edcc41434b58a07b66188a75152916ed7b46b2031afa5b5c0f046cacb726"

// Generate an access token with a shorter expiration time (e.g., 15 minutes)
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        ACCESS_SECRET_KEY,
        { expiresIn: '15m' } // Token expires in 15 minutes
    );
};

// Generate a refresh token with a longer expiration time (e.g., 7 days)
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        REFRESH_SECRET_KEY,
        { expiresIn: '7d' } // Token expires in 7 days
    );
};

module.exports = { generateAccessToken, generateRefreshToken };

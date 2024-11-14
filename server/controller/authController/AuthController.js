
const passport = require("passport");

 const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

 const  googleCallback = passport.authenticate("google", {
  failureRedirect: "http://localhost:5173",
  successRedirect: "http://localhost:5173/home",
});
  
  

module.exports={googleLogin,googleCallback}

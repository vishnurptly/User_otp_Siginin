
const passport = require("passport");

 const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

 const  googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  successRedirect: "/",
});

  const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports={googleLogin,googleCallback,logout}

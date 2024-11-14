
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GoogleLogModel = require("../../model/GoogleLog");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find the user based on their Google ID
        let user = await GoogleLogModel.findOne({ googleId: profile.id });
        if (!user) {
          // If the user doesn't exist, create a new user
          user = await GoogleLogModel.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await GoogleLogModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

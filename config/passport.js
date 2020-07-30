const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../model/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Stores user's google id, email, displayname, and photo
        const updateObj = { email: profile.emails[0].value };
        if (profile.displayName) updateObj.name = profile.displayName;
        if (profile.photos.length) updateObj.photo = profile.photos[0].value;

        // Update user name, email, and photo is already in database
        let user = await User.findOneAndUpdate(
          { googleId: profile.id },
          updateObj,
          { new: true, runValidators: true }
        );

        // Create a new user otherwise
        if (!user) {
          updateObj.googleId = profile.id;
          user = await User.create(updateObj);
        }

        // Process authentication
        done(null, user);
      } catch (error) {
        // To be handled
        console.error(error);
      }
    }
  )
);

module.exports = passport;

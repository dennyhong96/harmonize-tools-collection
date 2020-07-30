const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const {
        displayName: name,
        emails: [{ value: email }],
        photos: [{ value: photo }],
      } = profile;
      console.log(name, email, photo);
      done();
    }
  )
);

module.exports = passport;

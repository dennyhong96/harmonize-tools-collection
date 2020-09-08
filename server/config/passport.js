const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const bcrypt = require("bcryptjs");
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

// email + password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // check email
        let user = await User.findOne({ email: email });
        if (user) {
          // check password
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            return done(null, user);
          }
        }
        // -> error handling
        return done(null, null);
      } catch (error) {
        // -> error handling
        return done(error, null);
      }
    }
  )
);

// googleId + name + photo
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Stores google id, displayname, and photo
        const updateObj = {};
        if (profile.displayName) updateObj.name = profile.displayName;
        if (profile.photos.length) updateObj.photo = profile.photos[0].value;

        // Update user name, and photo is already in database
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
        // -> error handled
        done(error, null);
      }
    }
  )
);

// linkedInId + name + photo
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Stores linkin id, displayname, and photo
        const updateObj = {};
        if (profile.displayName) updateObj.name = profile.displayName;
        if (profile.photos.length) updateObj.photo = profile.photos[0].value;

        // Update user name, and photo is already in database
        let user = await User.findOneAndUpdate(
          { linkedInId: profile.id },
          updateObj,
          { new: true, runValidators: true }
        );

        // Create a new user otherwise
        if (!user) {
          updateObj.linkedInId = profile.id;
          user = await User.create(updateObj);
        }

        // Process authentication
        done(null, user);
      } catch (error) {
        // -> error handling
        console.error(error);
      }
    }
  )
);

// facebookId + name + photo
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/v1/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Stores facebook id, displayName, and photo
        const updateObj = {};
        if (profile.displayName) updateObj.name = profile.displayName;
        if (profile.photos.length) updateObj.photo = profile.photos[0].value;

        // Update user name and photo is already in database
        let user = await User.findOneAndUpdate(
          { facebookId: profile.id },
          updateObj,
          { new: true, runValidators: true }
        );

        // Create a new user otherwise
        if (!user) {
          updateObj.facebookId = profile.id;
          user = await User.create(updateObj);
        }

        // Process authentication
        done(null, user);
      } catch (error) {
        // -> error handling
        console.error(error);
      }
    }
  )
);

// twitterId + name + photo
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/api/v1/auth/twitter/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Stores twitter id, displayName, and photo
        const updateObj = {};
        if (profile.displayName) updateObj.name = profile.displayName;
        if (profile.photos.length) updateObj.photo = profile.photos[0].value;

        // Update user name and photo is already in database
        let user = await User.findOneAndUpdate(
          { twitterId: profile.id },
          updateObj,
          { new: true, runValidators: true }
        );

        // Create a new user otherwise
        if (!user) {
          updateObj.twitterId = profile.id;
          user = await User.create(updateObj);
        }

        // Process authentication
        done(null, user);
      } catch (error) {
        // -> error handling
        console.error(error);
      }
    }
  )
);

module.exports = passport;

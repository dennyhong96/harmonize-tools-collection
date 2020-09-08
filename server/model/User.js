const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  linkedInId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  twitterId: {
    type: String,
  },
  name: {
    type: String,
  },
  photo: {
    type: String,
    default:
      "https://haiyanghongnewbucket.s3-us-west-2.amazonaws.com/hendrix/user/default-user.png",
  },
});

// Pre-save hook to automatically hash user's password
userSchema.pre("save", async function (next) {
  // Bypass social logins that does not require a password
  if (!this.isModified("password")) {
    return next();
  }
  // Hash email logged in user's password
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare user's password with given plain text
userSchema.methods.isCorrectPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Sends back a new jwt for currently user instance
userSchema.methods.generateJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = mongoose.model("User", userSchema);

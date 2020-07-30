const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    requred: [true, "A google id is required"],
    unique: [true, "Google id already taken"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "A name is required"],
  },
  email: {
    type: String,
    required: [true, "An email is requried"],
    unique: [true, "This email is already taken"],
  },
  photo: {
    type: String,
    default:
      "https://haiyanghongnewbucket.s3-us-west-2.amazonaws.com/hendrix/user/default-user.png",
  },
});

module.exports = mongoose.model("User", userSchema);

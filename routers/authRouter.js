const express = require("express");

const passport = require("../config/passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  if (process.env.NODE_ENV !== "production") {
    return res.redirect("http://localhost:3000/app");
  }
  return res.redirect("/app");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ status: "success" });
});

router.get("/user", (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "failed", message: "User not logged in" });
  }
  return res.status(200).json({ status: "success", user: req.user });
});

module.exports = router;

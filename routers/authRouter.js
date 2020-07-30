const express = require("express");

const passport = require("../config/passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

router.get("/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;

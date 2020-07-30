require("dotenv").config({ path: "./config/config.env" });
const connectDB = require("./config/db");
const passport = require("./config/passport");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");

const User = require("./model/User");
const csvRouter = require("./routers/csvRouter");

const app = express();
connectDB();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(fileUpload());
app.use(xss());
app.use(hpp());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Serve built front end in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// Mount Routers
app.use("/api/v1/csv", csvRouter);

// Catch all
app.use("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server up on port ${port}...`));

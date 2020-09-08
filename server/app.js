require("dotenv").config({ path: `${__dirname}/config/config.env` });
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const passport = require("passport");
const cookieSession = require("cookie-session");
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");

const connectDB = require("./config/db");
const errorHandler = require("./controllers/errorController");
const csvRouter = require("./routers/csvRouter");
const authRouter = require("./routers/authRouter");
const chartRouter = require("./routers/chartRouter");

const app = express();
connectDB();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(fileUpload());
app.use(xss());
app.use(hpp());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serve built front end in production
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../clients", "mainpage", "build"))
  );
  app.use(
    "/orgchart",
    express.static(path.join(__dirname, "../clients", "orgchart", "build"))
  );
  app.use(
    "/contract",
    express.static(path.join(__dirname, "../clients", "contract", "build"))
  );
  app.use(
    "/calculator",
    express.static(path.join(__dirname, "../clients", "calculator"))
  );
}

// Mount Routers
app.use("/api/v1/csv", csvRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/charts", chartRouter);

app.use(errorHandler);

// Catch all
if (process.env.NODE_ENV === "production") {
  app.use("/orgchart/*", (req, res, next) => {
    res.sendFile(
      path.join(__dirname, "../clients", "orgchart", "build", "index.html")
    );
  });
  app.use("/calculator/*", (req, res, next) => {
    res.sendFile(
      path.join(__dirname, "../clients", "calculator", "index.html")
    );
  });
  app.use("/contract/*", (req, res, next) => {
    res.sendFile(
      path.join(__dirname, "../clients", "contract", "build", "index.html")
    );
  });
  app.use("*", (req, res, next) => {
    res.sendFile(
      path.join(__dirname, "../clients", "mainpage", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server up on port ${port}...`));

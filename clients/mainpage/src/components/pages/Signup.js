import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { ReactComponent as Google } from "../../assets/google.svg";
import { ReactComponent as Facebook } from "../../assets/facebook.svg";
import { ReactComponent as LinkedIn } from "../../assets/linkedin.svg";
import { ReactComponent as Twitter } from "../../assets/twitter.svg";
import Logo from "../../assets/logo.png";

import useStyles from "./LoginSignupStyles";
import "./LoginSignupStyles.scss";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const Signup = () => {
  const classes = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { email, password, passwordConfirm } = form;

  const [err, setErr] = useState("");

  const handleChange = async (evt) => {
    const { id, value } = evt.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(form);
    const url =
      process.env.NODE_ENV === "production"
        ? "/api/v1/auth/signup"
        : "http://localhost:5000/api/v1/auth/signup";

    if (!(email, password, passwordConfirm)) {
      setErr("Email, password, and confirm password are required.");
    } else if (password !== passwordConfirm) {
      setErr("Passwords do not match.");
    } else if (password.length < 6) {
      setErr("Password must be at least 6 characters long.");
    } else {
      try {
        const res = await axios.post(url, form, config);
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem("JWT_TOKEN", res.data.token);
          window.location = "/orgchart/app";
        } else {
          throw new Error();
        }
      } catch (error) {
        if (error.response && error.response.data.msg) {
          setErr(error.response.data.msg);
        } else {
          setErr("Something went wrong, try again later.");
        }
      }
    }
  };

  return (
    <div className="signup-page">
      <Box component="main" className={classes.container}>
        <Box className={classes.brandBox}>
          <Box
            component="a"
            href="https://www.harmonizehq.com/"
            target="_blank"
            rel="noopener"
          >
            <img src={Logo} alt="Harmonize Logo" width={45} />
          </Box>
          <Typography
            component="a"
            variant="h3"
            href="https://www.harmonizehq.com/"
            target="_blank"
            rel="noopener"
            className={classes.brand}
            style={{ color: "#fff" }}
          >
            Harmonize
          </Typography>
        </Box>
        <Paper className={classes.paper} elevation={7}>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography align="center" gutterBottom className={classes.title}>
              Sign up to get started...
            </Typography>
            <TextField
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              value={email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              value={password}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="passwordConfirm"
              label="Confirm Password"
              inputProps={{ type: "password" }}
              value={passwordConfirm}
              onChange={handleChange}
            />
            {err && (
              <Typography
                color="textSecondary"
                style={{
                  marginBottom: 0,
                  fontSize: "0.7rem",
                  color: "red",
                }}
              >
                {err}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1rem" }}
              type="submit"
              disabled={!(email && password && passwordConfirm)}
            >
              Sign Up
            </Button>
          </Box>
          <Divider style={{ marginTop: "1.2rem" }} />
          <Typography
            align="center"
            color="textSecondary"
            style={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              fontSize: "0.8rem",
            }}
          >
            Or sign up with your favorate social platform...
          </Typography>
          <Box className={classes.socialBox}>
            <IconButton
              onClick={() => {
                window.location =
                  process.env.NODE_ENV === "production"
                    ? "/api/v1/auth/google"
                    : "http://localhost:5000/api/v1/auth/google";
              }}
            >
              <Google fill="#4285F4" />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location =
                  process.env.NODE_ENV === "production"
                    ? "/api/v1/auth/facebook"
                    : "http://localhost:5000/api/v1/auth/facebook";
              }}
            >
              <Facebook fill="#3b5998" />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location =
                  process.env.NODE_ENV === "production"
                    ? "/api/v1/auth/twitter"
                    : "http://localhost:5000/api/v1/auth/twitter";
              }}
            >
              <Twitter fill="#00acee" />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location =
                  process.env.NODE_ENV === "production"
                    ? "/api/v1/auth/linkedin"
                    : "http://localhost:5000/api/v1/auth/linkedin";
              }}
            >
              <LinkedIn fill="#0e76a8" />
            </IconButton>
          </Box>
          <Typography
            align="center"
            color="textSecondary"
            style={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              fontSize: "0.7rem",
            }}
          >
            Have an account? <Link to="/login">Sign in &rarr;</Link>
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default Signup;

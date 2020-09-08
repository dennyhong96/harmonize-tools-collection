import React from "react";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { ReactComponent as Medium } from "../../assets/medium.svg";
import Logo from "../../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },
  brandBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(2),
  },
  brand: {
    marginLeft: "1rem",
    textDecoration: "none",
    color: "#fff",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
  },
  footerLink: {
    ...theme.typography.body2,
    color: "#fff",
    textDecoration: "none",
    marginBottom: theme.spacing(1),
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 1,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "#fff",
    },
  },
  socialIcon: {
    color: "#fff",
    width: 20,
    height: 20,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const classes = useStyles();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Box
      component="footer"
      style={{ backgroundColor: theme.palette.primary.main, color: "#fff" }}
    >
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12} sm={6} className={classes.gridItem}>
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
                className={classes.brand}
                href="https://www.harmonizehq.com/"
                target="_blank"
                rel="noopener"
              >
                Harmonize
              </Typography>
            </Box>
            <Typography variant="body2">
              Harmonize is a chat-based HR system that brings in the benefits of
              collaboration and automation to everday mundane tasks in
              workplaces. It allows people to achieve more by doing less.
            </Typography>
            <Typography
              variant="body2"
              style={{
                color: "#ddd",
                fontSize: ".7rem",
                marginTop: theme.spacing(2),
                marginBottom: xsDown ? theme.spacing(2) : undefined,
              }}
            >
              © 2020 Anaek Inc. All rights reserved.
            </Typography>
          </Grid>
          <Hidden xsDown>
            <Grid item xs={1} />
          </Hidden>
          <Grid item xs={12} sm={5}>
            <Grid container direction="column">
              <Grid item container>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <a
                    href="https://www.harmonizehq.com/about.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLink}
                  >
                    About
                  </a>
                  <a
                    href="https://www.harmonizehq.com/contact.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLink}
                  >
                    Contact Us
                  </a>
                  <a
                    href="https://www.attendancebot.com/blog/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLink}
                  >
                    Blog
                  </a>
                  <a
                    href="https://www.harmonizehq.com/tos.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLink}
                  >
                    Terms of Service
                  </a>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <a
                    href="https://www.harmonizehq.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLink}
                  >
                    harmonizehq.com
                  </a>
                  <a
                    href="https://www.harmonizehq.com/attendancebot.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLink}
                  >
                    AttendanceBot
                  </a>
                  <a
                    href="https://www.harmonizehq.com/officeamp.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLink}
                  >
                    OfficeAmp
                  </a>
                  <a
                    href="https://www.harmonizehq.com/expensetron.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLink}
                  >
                    ExpenseTron
                  </a>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  component="a"
                  href="https://twitter.com/harmonizehq"
                  target="_blank"
                  rel="noopener noreferrer"
                  edge="start"
                >
                  <TwitterIcon className={classes.socialIcon} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/company/harmonizehq/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon className={classes.socialIcon} />
                </IconButton>
                <IconButton
                  component="a"
                  href="mailto:hi@harmonizehq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MailOutlineIcon className={classes.socialIcon} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.attendancebot.com/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Medium style={{ transform: "scale(0.7)", marginLeft: -4 }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

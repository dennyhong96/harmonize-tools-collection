import React from "react";
import { makeStyles } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Particles from "./Particles";

const useStyles = makeStyles((theme) => ({
  contentBox: {
    width: "55%",
    margin: "0 auto",
    textAlign: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  lead2: {
    ...theme.typography.lead2,
    marginBottom: theme.spacing(2),
  },
  lead: {
    ...theme.typography.lead,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Container component="section">
      <Particles />
      <Box className={classes.contentBox}>
        <Typography className={classes.lead2}>
          For small and midsize businesses
        </Typography>
        <Typography variant="h1" className={classes.title}>
          Free tools to excel in HR
        </Typography>
        <Typography className={classes.lead}>
          Crafted to make everyday mundane tasks quicker and easier. Automate
          and simplify your work to focus on what really matters — Harmonizing
          your teams.
        </Typography>
      </Box>
    </Container>
  );
};

export default Header;

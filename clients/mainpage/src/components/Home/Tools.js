import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  card: {
    backgroundColor: "#fff",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    textAlign: "center",
    borderRadius: theme.spacing(1.5),
    height: "100%",
    "& a": {
      borderBottom: `1px solid transparent`,
      transition: "border 0.2s ease",
    },
    "&:hover": {
      cursor: "pointer",
      "& a": {
        borderBottom: `1px solid ${theme.palette.common.blue}`,
      },
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(2.5),
      paddingBottom: theme.spacing(2.5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
}));

const Tools = () => {
  const classes = useStyles();
  const theme = useTheme();

  const navigate = (href, newTab) => {
    const a = document.createElement("a");
    a.href = href;
    if (newTab) {
      a.setAttribute("target", "_blank");
    }
    a.click();
  };

  return (
    <Box
      component="main"
      style={{ backgroundColor: theme.palette.common.lightPink }}
    >
      <Container className={classes.container}>
        <Grid container spacing={5} style={{ marginBottom: theme.spacing(2) }}>
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <Box
              className={classes.card}
              onClick={() => navigate("/calculator", true)}
            >
              <Typography variant="h2">Paycheck Calculator</Typography>
              <Typography variant="body1">
                Don’t drown yourself in complex calculations! Use our easy to
                understand paycheck calculator to know your employees’ take-home
                pay.
              </Typography>
              <Typography
                component="a"
                target="_blank"
                href="/calculator"
                style={{ ...theme.typography.link3 }}
              >
                Learn More &rarr;
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className={classes.gridItem}
            onClick={() => navigate("/orgchart", true)}
          >
            <Box className={classes.card}>
              <Typography variant="h2">Organizational Chart</Typography>
              <Typography variant="body1">
                Need help visualizing the structure of your business? Use our
                organizational chart tool to bring employees together and make
                your organization more connected.
              </Typography>
              <Typography
                component="a"
                target="_blank"
                href="/orgchart"
                style={{ ...theme.typography.link3 }}
              >
                Learn More &rarr;
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <Box
              className={classes.card}
              onClick={() => navigate("/contract", true)}
            >
              <Typography variant="h2">Contract Generator</Typography>
              <Typography variant="body1">
                New hire? No problem? Create free customized new-hire NDA in
                just a few minutes.
              </Typography>
              <Typography
                component="a"
                target="_blank"
                href="/contract"
                style={{ ...theme.typography.link3 }}
              >
                Learn More &rarr;
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <Box className={classes.card}>
              <Typography variant="h2">Onboarding</Typography>
              <Typography variant="body1">Launching soon!</Typography>
              {/* <Typography
                component="a"
                href="#!"
                style={{ ...theme.typography.link3 }}
              >
                Learn More &rarr;
              </Typography> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Tools;

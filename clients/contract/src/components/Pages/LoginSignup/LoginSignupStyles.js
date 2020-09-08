import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
    width: "90%",
    maxWidth: "28rem",
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: 400,
    color: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  socialBox: {
    display: "flex",
    justifyContent: "space-around",
  },
  brandBox: {
    position: "absolute",
    top: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    marginLeft: "1rem",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

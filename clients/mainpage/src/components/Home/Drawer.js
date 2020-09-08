import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "15rem",
    paddingTop: theme.spacing(2),
  },
  iconButton: {
    width: "3rem",
    // marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  listItemText: {
    margin: 0,
    display: "inline",
    paddingBottom: 3,
    // borderBottom: `1px solid #000`,
    fontSize: "0.8rem",
  },
  blog: {
    ...theme.typography.lead2,
    margin: 0,
    display: "inline",
    paddingBottom: 3,
    // borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
}));

const _Drawer = ({ open, onClose, onOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <SwipeableDrawer
      classes={{ paper: classes.drawer }}
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <IconButton className={classes.iconButton} onClick={onClose}>
        <ChevronRightIcon style={{ color: theme.palette.primary.main }} />
      </IconButton>
      <Typography
        style={{
          marginLeft: theme.spacing(2),
          marginBottom: 0,
          ...theme.typography.lead2,
        }}
      >
        PRODUCTS
      </Typography>
      <List>
        <ListItem
          className={classes.listItem}
          button
          component="a"
          href="/calculator"
          target="_blank"
          rel="noopener"
        >
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Paycheck Calculator"
          />
          <ArrowRightIcon />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          component="a"
          href="/orgchart"
          target="_blank"
        >
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Organizational Chart"
          />
          <ArrowRightIcon />
        </ListItem>
        <ListItem
          className={classes.listItem}
          button
          component="a"
          href="/contract"
          target="_blank"
        >
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Contract Generator"
          />
          <ArrowRightIcon />
        </ListItem>
        <ListItem className={classes.listItem} button>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Onboarding"
          />
          <ArrowRightIcon />
        </ListItem>
        <Divider style={{ marginTop: theme.spacing(2) }} />
        <ListItem
          button
          component="a"
          href="https://www.attendancebot.com/blog/"
          target="_blank"
        >
          <ListItemText classes={{ primary: classes.blog }} primary="BLOG" />
          <ArrowRightIcon style={{ color: theme.palette.primary.main }} />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

export default _Drawer;

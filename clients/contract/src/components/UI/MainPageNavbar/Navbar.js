import React, { useState, useRef, useEffect, useCallback } from "react";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Logo from "../../Assets/harmonize_logo.png";

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    transition: "background 0.3s ease",
  },
  appBarScroll: {
    backgroundColor: "#fff",
    transition: "background 0.3s ease",
  },
  toolbar: {
    justifyContent: "space-between",
    height: "5rem",
    padding: 0,
  },
  brandBox: {
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
  linkBox: {
    width: "12rem",
    display: "flex",
    justifyContent: "space-between",
  },
  navLink: {
    ...theme.typography.link1,
    "&:hover": {
      textDecoration: "none",
    },
  },
  menuLink: {
    ...theme.typography.link2,
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
    margin: 0,
  },
}));

const Navbar = ({ onDrawerOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [scrollStyle, setScrollStyle] = useState(false);
  const anchorRef = useRef(null);

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  // Toggle between 2 navbar styles depend on scroll position
  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 50) {
      setScrollStyle(true);
    } else {
      setScrollStyle(false);
    }
  }, [setScrollStyle]);

  // Attach the style toggle to window
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Menu
  const handleMenuOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box component="nav">
      <AppBar className={scrollStyle ? classes.appBarScroll : classes.appBar}>
        <Container>
          <Toolbar className={classes.toolbar}>
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
                style={{
                  color: scrollStyle ? theme.palette.primary.main : "#fff",
                }}
              >
                Harmonize
              </Typography>
            </Box>
            {smDown ? (
              <IconButton edge="end" onClick={onDrawerOpen}>
                <ChevronLeftIcon
                  style={{
                    color: scrollStyle ? theme.palette.primary.main : "#fff",
                  }}
                />
              </IconButton>
            ) : (
              <Box className={classes.linkBox}>
                <Box>
                  <Button
                    className={classes.navLink}
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    onMouseEnter={handleMenuOpen}
                    onMouseLeave={handleMenuClose}
                    disableFocusRipple
                    style={{
                      color: scrollStyle ? theme.palette.primary.main : "#fff",
                    }}
                  >
                    Products
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper className={classes.menuPaper}>
                          <ClickAwayListener onClickAway={handleMenuClose}>
                            <MenuList
                              id="menu-list-grow"
                              onMouseLeave={handleMenuClose}
                              style={{ marginTop: -5 }}
                            >
                              <MenuItem
                                component="a"
                                href="/calculator"
                                target="_blank"
                                className={classes.menuLink}
                                onClick={handleMenuClose}
                              >
                                Paycheck Calculator
                              </MenuItem>
                              <MenuItem
                                component="a"
                                href="/orgchart"
                                target="_blank"
                                className={classes.menuLink}
                                onClick={handleMenuClose}
                              >
                                Organizational Chart
                              </MenuItem>
                              <MenuItem
                                component="a"
                                href="/contract"
                                target="_blank"
                                className={classes.menuLink}
                                onClick={handleMenuClose}
                              >
                                Contract Generator
                              </MenuItem>
                              <MenuItem
                                className={classes.menuLink}
                                onClick={handleMenuClose}
                              >
                                Onboarding
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Box>
                <Button
                  component="a"
                  href="https://www.attendancebot.com/blog/"
                  target="_blank"
                  className={classes.navLink}
                  style={{
                    color: scrollStyle ? theme.palette.primary.main : "#fff",
                    marginRight: -8,
                  }}
                >
                  Blog
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box style={{ height: "5rem" }} />
    </Box>
  );
};

export default Navbar;

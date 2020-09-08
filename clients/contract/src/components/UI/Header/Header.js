import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import path from "../../../utils/path";
import UserContext from "../../../contexts/User";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "./Header.scss";
import { Typography } from "@material-ui/core";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (evt) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(evt.currentTarget);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAnchorEl(null);
    localStorage.removeItem("JWT_TOKEN");
  };

  return (
    <nav className="topbar">
      <h3 className="topbar__title">Forms</h3>

      {user ? (
        <div className="topbar__actions">
          <h4 className="topbar__greeting">
            Welcome, {user.email.split("@")[0]}
          </h4>
          <IconButton
            style={{ padding: 5, outline: "none", marginLeft: 3 }}
            onClick={handleClick}
          >
            {!!anchorEl ? (
              <KeyboardArrowUpIcon style={{ color: "#000", fontSize: 28 }} />
            ) : (
              <KeyboardArrowDownIcon style={{ color: "#000", fontSize: 28 }} />
            )}
          </IconButton>
          <Menu
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClick}
            anchorOrigin="bottom"
            style={{ marginTop: "2.5rem" }}
          >
            <MenuItem button onClick={handleLogout}>
              <Typography style={{ margin: 0, marginRight: 5 }}>
                Logout
              </Typography>
              <ExitToAppIcon />
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="topbar__actions">
          <Link className="topbar__btn" to={path("/login")}>
            Login
          </Link>
          <Link className="topbar__btn" to={path("/signup")}>
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}

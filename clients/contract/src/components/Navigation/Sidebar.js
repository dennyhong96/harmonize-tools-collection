import React from "react";

import { Link } from "react-router-dom";

import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar__icons">
        <a href="#!" className="sidebar__icons-box">
          <i className="sidebar__icons-icon far fa-sticky-note"></i>
        </a>
        <Link to="/dashboard" className="sidebar__icons-box">
          <i className="sidebar__icons-icon far fa-user-circle"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;

import React from "react";

import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar__icons">
        <a href="#!" className="sidebar__icons-box">
          <i className="sidebar__icons-icon far fa-sticky-note"></i>
        </a>
        <a href="#!" className="sidebar__icons-box">
          <i className="sidebar__icons-icon far fa-user-circle"></i>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;

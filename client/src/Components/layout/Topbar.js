import React from "react";

import "./Topbar.scss";

const topbar = () => {
  return (
    <div className="topbar">
      <div className="toggler-btn">
        <i className="fas fa-bars"></i>
      </div>
      <h1 className="heading">ORGANIZATIONAL CHART TOOL</h1>
    </div>
  );
};

export default topbar;

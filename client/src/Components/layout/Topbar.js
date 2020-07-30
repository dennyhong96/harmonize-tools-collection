import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  openSideDrawer,
  closeSideDrawer,
} from "../../actions/sideDrawerAction";
import "./Topbar.scss";

const topbar = ({ sideDrawer, closeSideDrawer, openSideDrawer, user }) => {
  return (
    <div className={`topbar ${sideDrawer ? "sidedrawer-show" : ""}`}>
      {/* <div
        className={`toggler-btn ${sideDrawer ? "opened" : ""}`}
        onClick={toggleSideDrawer}
      >
        <i className="fas fa-chevron-right"></i>
      </div> */}
      <div className="">
        <h1 className="heading">ORGANIZATIONAL CHART TOOL</h1>
        <p className="sub-heading">
          Begin creating your chart by{" "}
          <span onClick={() => openSideDrawer()}>
            uploading your employee data
          </span>{" "}
          or by starting from scratch below.
        </p>
      </div>

      <div className="topbar-actions">
        {user ? (
          <button>
            <i class="fas fa-sign-out-alt"></i> logout
          </button>
        ) : (
          <a href="http://localhost:5000/api/v1/auth/google">
            <i class="fab fa-google"></i> sign in with google
          </a>
        )}
        <Link to="/">HOME</Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ sideDrawer }) => ({ sideDrawer });

export default connect(mapStateToProps, { openSideDrawer, closeSideDrawer })(
  topbar
);

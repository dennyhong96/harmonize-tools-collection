import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import {
  openSideDrawer,
  closeSideDrawer,
} from "../../actions/sideDrawerAction";
import { logout, login } from "../../actions/userActions";
import { startNewChart } from "../../actions/orgChartActions";
import "./Topbar.scss";

const topbar = ({
  sideDrawer,
  closeSideDrawer,
  openSideDrawer,
  startNewChart,
  user,
  logout,
  history,
  login,
}) => {
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
          <span className="upload" onClick={() => openSideDrawer()}>
            uploading your employee data
          </span>{" "}
          or by <span onClick={startNewChart}>starting from scratch</span>{" "}
          below.
        </p>
      </div>

      <div className="d-flex">
        <div className="topbar-actions">
          {user ? (
            <button onClick={logout}>
              <i class="fas fa-sign-out-alt"></i> logout
            </button>
          ) : (
            <button onClick={login}>
              <i class="fab fa-google"></i> sign in with google
            </button>
          )}
          <Link to="/">HOME</Link>
        </div>
        {user && (
          <div className="avatar">
            <img src={user.photo} alt="user photo" />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ sideDrawer }) => ({ sideDrawer });

export default connect(mapStateToProps, {
  openSideDrawer,
  closeSideDrawer,
  logout,
  startNewChart,
  login,
})(withRouter(topbar));

{
  /* <a
              href={
                process.env.NODE_ENV === "production"
                  ? "/api/v1/auth/google"
                  : "http://localhost:5000/api/v1/auth/google"
              }
            >
              <i class="fab fa-google"></i> sign in with google
            </a> */
}

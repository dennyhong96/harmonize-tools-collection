import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";

import {
  openSideDrawer,
  closeSideDrawer,
} from "../../actions/sideDrawerAction";
import ConfirmNewChartPopup from "../charts/ConfirmNewChartPopup";
import { logout, login } from "../../actions/userActions";
import { startNewChart } from "../../actions/orgChartActions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./Topbar.scss";

const Topbar = ({ sideDrawer, startNewChart, user, logout }) => {
  const [newChartPopupShow, setNewChartPopupShow] = useState(false);

  return (
    <Fragment>
      <div className={`topbar ${sideDrawer ? "sidedrawer-show" : ""}`}>
        <Link className="home-link" to="/orgchart">
          <ArrowBackIcon style={{ fontSize: 18, marginRight: 2 }} /> HOME
        </Link>
        <div className="">
          <h1 className="heading">ORGANIZATIONAL CHART TOOL</h1>
        </div>

        <div className="d-flex">
          <div className="topbar-actions">
            {user ? (
              <button onClick={logout} className="mr-2 signup-btn">
                <i class="fas fa-sign-out-alt"></i> Sign Out
              </button>
            ) : (
              <Fragment>
                <a href="/login" className="mr-2 signin-btn">
                  Sign In
                </a>
                <a href="/signup" className="signup-btn">
                  Sign Up
                </a>
              </Fragment>
            )}
          </div>
          {user && (
            <div className="avatar">
              <img src={user.photo} alt="user photo" />
            </div>
          )}
        </div>
      </div>
      <ConfirmNewChartPopup
        show={newChartPopupShow}
        onHide={() => setNewChartPopupShow(false)}
        setNewChartPopupShow={setNewChartPopupShow}
        startNewChart={startNewChart}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ sideDrawer }) => ({ sideDrawer });

export default connect(mapStateToProps, {
  openSideDrawer,
  closeSideDrawer,
  logout,
  startNewChart,
  login,
})(withRouter(Topbar));

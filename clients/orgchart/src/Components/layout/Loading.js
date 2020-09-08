import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { openToolTips } from "../../actions/tooltipActions";
import { closeLoading } from "../../actions/loadingActions";

import Logo from "../../assets/logo.png";
import LoadingImg from "../../assets/window-loading.png";
import "./Loading.scss";

const Loading = () => {
  const dispatch = useDispatch();
  const loading = useSelector(({ loading }) => loading);
  const user = useSelector(({ user }) => user);

  const handleStart = () => {
    dispatch(closeLoading());
    dispatch(openToolTips());
  };
  const handleSkip = () => {
    dispatch(closeLoading());
  };

  return (
    <Fragment>
      {loading && !user && <div className="loading-screen"></div>}
      <div className={`loading-popup ${loading && !user ? "loading" : ""}`}>
        <div className="top-part">
          <div className="brand">
            <img src={Logo} alt="logo" className="brand-img" />
            <h4>Harmonize</h4>
          </div>
          <img src={LoadingImg} alt="loadingimg" className="loading" />
        </div>
        <div className="bottom-part">
          <h2>Hey there!</h2>
          <h3>We’re so excited you’re here!</h3>
          <p>
            If this is your first time visiting, we’d love to show you how to
            create <strong>your first org chart</strong>.
          </p>
          <div className="action-box">
            <button className="start" onClick={handleStart}>
              Start Tour
            </button>
            <button className="skip" onClick={handleSkip}>
              Skip Tour
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Loading;

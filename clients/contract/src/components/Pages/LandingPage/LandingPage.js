import React from "react";
import "./LandingPage.css";
import { useHistory } from "react-router-dom";

export default function LandingPage() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/getStarted");
  };

  return (
    <>
      <div className="LandingPage">
        <div>
          <h1 className="landing-heading">New hires? No Problem.</h1>
          <br /> <br />
          <p className="sub-heading">
            {" "}
            Create free customized new-hire legal documents in just a few
            minutes.
          </p>
          <br />
          <button className="button" onClick={handleClick}>
            Get started
          </button>
        </div>
      </div>
    </>
  );
}

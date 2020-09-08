import React, { Fragment } from "react";

import ToolTip from "../widgets/ToolTip";
import "./StepFour.scss";
import finishLine from "../../assets/finishline.svg";

const StepFour = ({ setStep }) => {
  return (
    <Fragment>
      <div className="step-four">
        <h1 className="heading-import">Import Members</h1>
        <div className="step-four-progress-text">
          <span className="st-1 text-center">
            1. Download <br /> <span>Template</span>
          </span>
          <span className="st-2 ">2. Edit & Save</span>
          {/* <span className="st-3">3. Upload File</span> */}
          <span className="st-4">3. Generate Chart</span>
        </div>
        <div className="step-four-progress">
          <div className="line"></div>
          <ToolTip message="Back to step 1" delay={{ show: 150, hide: 100 }}>
            <div
              className="milestone finished ms-1"
              onClick={() => setStep(1)}
            ></div>
          </ToolTip>
          {/* <ToolTip message="Back to step 2" delay={{ show: 150, hide: 100 }}>
            <div
              className="milestone finished ms-2"
              onClick={() => setStep(2)}
            ></div>
          </ToolTip> */}
          <ToolTip message="Back to step 2" delay={{ show: 150, hide: 100 }}>
            <div
              className="milestone finished ms-3"
              onClick={() => setStep(3)}
            ></div>
          </ToolTip>

          <div className="milestone checked ms-4">
            <i class="fas fa-check"></i>
          </div>
        </div>
        <h2 className="step-four-heading">Congrats!</h2>
        <img src={finishLine} className="finishline" alt="finish-line" />
        <p className="step-four-msg">
          Your chart is now viewable on the right-hand side of the screen.
        </p>
        <a href="/" rel="noopener noreferrer" className="harmonize-link">
          Explore other HR tools <i class="fas fa-arrow-right"></i>
        </a>
        <hr />
      </div>
      <div className="step-four-actions">
        <hr />
        <button
          className="step-four-action-back"
          onClick={() => {
            setStep(2);
          }}
        >
          Back
        </button>
      </div>
    </Fragment>
  );
};

export default StepFour;

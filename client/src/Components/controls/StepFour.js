import React, { Fragment } from "react";

import "./StepFour.scss";
import finishLine from "../../assets/finishline.png";

const StepFour = ({ setStep }) => {
  return (
    <Fragment>
      <div className="step-four">
        <div className="step-four-progress-text">
          <span className="st-1 text-center">
            1. Download <br /> <span>Template</span>
          </span>
          <span className="st-2 ">2. Edit & Save</span>
          <span className="st-3">3. Upload File</span>
          <span className="st-4">4. Generate Chart</span>
        </div>
        <div className="step-four-progress">
          <div className="line"></div>
          <div className="milestone finished ms-1"></div>
          <div className="milestone finished ms-2"></div>
          <div className="milestone finished ms-3"></div>
          <div className="milestone checked ms-4">
            <i class="fas fa-check"></i>
          </div>
        </div>
        <h2 className="step-four-heading">Congrats!</h2>
        <img src={finishLine} className="finishline" alt="finish-line" />
        <p className="step-four-msg">
          Your chart is now viewable on the right-hand side of the screen.
        </p>
        <a
          href="https://www.harmonizehq.com/"
          rel="noopener noreferrer"
          target="_blank"
          className="harmonize-link"
        >
          Explore other HR tools <i class="fas fa-arrow-right"></i>
        </a>
        <hr />
      </div>
      <div className="step-four-actions">
        <hr />
        <button
          className="step-four-action-back"
          onClick={() => {
            setStep(3);
          }}
        >
          Back
        </button>
      </div>
    </Fragment>
  );
};

export default StepFour;

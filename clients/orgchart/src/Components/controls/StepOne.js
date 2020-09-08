import React, { Fragment } from "react";

import csvEmpty from "../../assets/csv-empty.png";
import "./StepOne.scss";

const StepOne = ({ template, getTemplate, setStep }) => {
  const handleNextStep = () => {
    setStep(2);
  };

  return (
    <Fragment>
      <div className="step-one">
        <h1 className="heading-import">Import Members</h1>
        <div className="step-one-progress-text">
          <span className="st-1 text-center">
            1. Download <br /> <span>Template</span>
          </span>
          <span className="st-2">2. Edit & Save</span>
          {/* <span className="st-3">3. Upload File</span> */}
          <span className="st-4">3. Generate Chart</span>
        </div>
        <div className="step-one-progress">
          <div className="line"></div>
          <div className="milestone active ms-1"></div>
          <div className="milestone ms-2"></div>
          {/* <div className="milestone ms-3"></div> */}
          <div className="milestone ms-4"></div>
        </div>
        <h2 className="step-one-heading">STEP 1</h2>
        <p className="step-one-msg">
          Download our <span>.CSV</span> template
        </p>
        <img
          src={csvEmpty}
          className="step-one-csv"
          alt="empty-csv-screenshot"
        />
        <button className="step-one-download" onClick={getTemplate}>
          Download Template <i className="fas fa-download"></i>
        </button>
      </div>
      <div className="stepone-actions">
        <hr />
        {template.isDownloaded ? (
          <button className="step-one-continue" onClick={handleNextStep}>
            Continue
          </button>
        ) : (
          <button className="step-one-continue" disabled>
            Continue
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default StepOne;

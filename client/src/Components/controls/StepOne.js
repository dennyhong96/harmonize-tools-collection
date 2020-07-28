import React from "react";

import csvEmpty from "../../assets/csv-empty.png";
import "./StepOne.scss";

const StepOne = ({ template, getTemplate, resetTemplate, setStep }) => {
  const handleNextStep = () => {
    resetTemplate();
    setStep(2);
  };

  return (
    <div className="step-one">
      <div className="step-one-progress-text">
        <span className="st-1 text-center">
          1. Download <br /> <span>Template</span>
        </span>
        <span className="st-2 ">2. Edit & Save</span>
        <span className="st-3">3. Upload File</span>
        <span className="st-4">4. Generate Chart</span>
      </div>
      <div className="step-one-progress">
        <div className="line"></div>
        <div className="milestone active ms-1"></div>
        <div className="milestone ms-2"></div>
        <div className="milestone ms-3"></div>
        <div className="milestone ms-4"></div>
      </div>
      <h2 className="step-one-heading">STEP 1</h2>
      <p className="step-one-msg">
        Download our <span>.CSV</span> template
      </p>
      <img src={csvEmpty} className="step-one-csv" alt="empty-csv-screenshot" />
      <button className="step-one-download" onClick={getTemplate}>
        Download file <i className="fas fa-download"></i>
      </button>
      <hr />
      {template ? (
        <button className="step-one-continue" onClick={handleNextStep}>
          Continue
        </button>
      ) : (
        <button className="step-one-continue" disabled>
          Continue
        </button>
      )}
    </div>
  );
};

export default StepOne;

import React from "react";
import { Button } from "react-bootstrap";

import "./StepTwo.scss";
import csv from "../../assets/csv.png";

const StepTwo = ({ setStep }) => {
  return (
    <div className="step-two">
      <div className="step-two-progress-text">
        <span className="st-1 text-center">1. Download Template</span>
        <span className="st-2 ">2. Edit & Save</span>
        <span className="st-3">3. Upload File</span>
        <span className="st-4">4. Generate Chart</span>
      </div>
      <div className="step-two-progress">
        <div className="line"></div>
        <div className="milestone finished ms-1"></div>
        <div className="milestone active ms-2"></div>
        <div className="milestone ms-3"></div>
        <div className="milestone ms-4"></div>
      </div>
      <h2 className="step-two-heading">Step 2</h2>
      <p className="step-two-msg">Enter your employee information</p>
      <img src={csv} className="step-two-csv" alt="csv-screenshot" />
      <p className="step-two-msg-2">
        Save your updated template as a .CSV file
      </p>
      <hr />
      <div className="step-two-actions">
        <button className="step-two-action-back" onClick={() => setStep(1)}>
          Back
        </button>
        <button className="step-two-action-continue" onClick={() => setStep(3)}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepTwo;

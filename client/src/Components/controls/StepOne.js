import React from "react";
import { Button } from "react-bootstrap";

import csv from "../../assets/csv.png";
import "./StepOne.scss";

const StepOne = ({ handleDownload }) => {
  return (
    <div className="step-one">
      <div className="step-one-progress-text">
        <span className="st-1">1. Download Template</span>
        <span className="st-2">2. Edit & Save</span>
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
      <img src={csv} className="step-one-csv" alt="" />
      <button className="step-one-download" onClick={handleDownload}>
        Download file <i class="fas fa-download"></i>
      </button>
      <hr />
      <button className="step-one-continue">Continue</button>
    </div>
  );
};

export default StepOne;

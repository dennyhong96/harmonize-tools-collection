import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import { getTemplate } from "../../actions/csvTemplateActions";
import { uploadOrgData } from "../../actions/orgChartActions";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import "./ControlPanel.scss";

const ControlPanel = ({ getTemplate, uploadOrgData }) => {
  const [step, setStep] = useState(1);

  const handleDownload = async () => {
    if (await getTemplate()) {
      setStep(2);
    }
  };

  return (
    <div className="control-panel side-drawer-close">
      {step === 1 && <StepOne handleDownload={handleDownload} />}
      {step === 2 && <StepTwo setStep={setStep} />}
      {step === 3 && (
        <StepThree setStep={setStep} uploadOrgData={uploadOrgData} />
      )}
      {step === 4 && <StepFour setStep={setStep} />}
    </div>
  );
};

export default connect(null, { getTemplate, uploadOrgData })(ControlPanel);

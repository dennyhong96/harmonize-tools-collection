import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import { getTemplate } from "../../actions/csvTemplateActions";
import { uploadOrgData } from "../../actions/orgChartActions";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

const ControlPanel = ({ getTemplate, uploadOrgData }) => {
  const [step, setStep] = useState(1);

  const handleDownload = async () => {
    if (await getTemplate()) {
      setStep(2);
    }
  };

  return (
    <Fragment>
      {step === 1 && <StepOne handleDownload={handleDownload} />}
      {step === 2 && <StepTwo setStep={setStep} />}
      {step === 3 && (
        <StepThree setStep={setStep} uploadOrgData={uploadOrgData} />
      )}
      {step === 4 && <StepFour setStep={setStep} />}
    </Fragment>
  );
};

export default connect(null, { getTemplate, uploadOrgData })(ControlPanel);

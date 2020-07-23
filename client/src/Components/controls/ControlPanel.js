import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import { getTemplate, uploadTemplate } from "../../actions/csvTemplateActions";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

const ControlPanel = ({ template, getTemplate, uploadTemplate }) => {
  const [step, setStep] = useState(1);

  const handleDownload = async () => {
    if (await getTemplate()) {
      setStep(2);
    }
  };

  const handleUpload = async (file) => {
    if (await uploadTemplate(file)) {
      uploadTemplate(file);
      setStep(4);
    }
  };

  return (
    <Fragment>
      {step === 1 && <StepOne handleDownload={handleDownload} />}
      {step === 2 && <StepTwo setStep={setStep} />}
      {step === 3 && <StepThree handleUpload={handleUpload} />}
      {step === 4 && <StepFour setStep={setStep} />}
    </Fragment>
  );
};

const mapStateToProps = ({ template }) => ({ template });

export default connect(mapStateToProps, { getTemplate, uploadTemplate })(
  ControlPanel
);

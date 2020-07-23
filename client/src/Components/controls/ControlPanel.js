import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import { getTemplate, uploadTemplate } from "../../actions/csvTemplateActions";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const ControlPanel = ({ template, getTemplate, uploadTemplate }) => {
  const [step, setStep] = useState(1);

  const handleDownload = async () => {
    if (await getTemplate()) {
      setStep(2);
    }
  };

  const handleUpload = (file) => {
    console.log(file);
    uploadTemplate(file);
  };

  return (
    <Fragment>
      {step === 1 && <StepOne handleDownload={handleDownload} />}
      {step === 2 && <StepTwo setStep={setStep} />}
      {step === 3 && <StepThree handleUpload={handleUpload} />}
    </Fragment>
  );
};

const mapStateToProps = ({ template }) => ({ template });

export default connect(mapStateToProps, { getTemplate, uploadTemplate })(
  ControlPanel
);

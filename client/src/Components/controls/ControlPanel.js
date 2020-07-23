import React, { useState, Fragment } from "react";
import { connect } from "react-redux";

import { getTemplate } from "../../actions/csvTemplateActions";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const ControlPanel = ({ template, getTemplate }) => {
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
    </Fragment>
  );
};

const mapStateToProps = ({ template }) => ({ template });

export default connect(mapStateToProps, { getTemplate })(ControlPanel);

import React, { useState } from "react";
import { connect } from "react-redux";

import { getTemplate } from "../../actions/csvTemplateActions";
import { uploadOrgData } from "../../actions/orgChartActions";
import { closeSideDrawer } from "../../actions/sideDrawerAction";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import "./ControlPanel.scss";

const ControlPanel = ({
  sideDrawer,
  getTemplate,
  uploadOrgData,
  closeSideDrawer,
}) => {
  const [step, setStep] = useState(1);

  const handleDownload = async () => {
    if (await getTemplate()) {
      setStep(2);
    }
  };

  return (
    <div className={`control-panel ${!sideDrawer ? "side-drawer-close" : ""}`}>
      <div className="toggler-btn" onClick={closeSideDrawer}>
        <i class="fas fa-chevron-left"></i>
      </div>
      {step === 1 && <StepOne handleDownload={handleDownload} />}
      {step === 2 && <StepTwo setStep={setStep} />}
      {step === 3 && (
        <StepThree setStep={setStep} uploadOrgData={uploadOrgData} />
      )}
      {step === 4 && <StepFour setStep={setStep} />}
    </div>
  );
};

const mapStateToProps = ({ sideDrawer }) => ({ sideDrawer });

export default connect(mapStateToProps, {
  getTemplate,
  uploadOrgData,
  closeSideDrawer,
})(ControlPanel);

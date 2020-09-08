import React, { useState } from "react";
import { connect } from "react-redux";

import { setStep } from "../../actions/stepActions";
import { getTemplate, resetTemplate } from "../../actions/csvTemplateActions";
import { uploadOrgData } from "../../actions/orgChartActions";
import {
  closeSideDrawer,
  openSideDrawer,
} from "../../actions/sideDrawerAction";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import "./ControlPanel.scss";

const ControlPanel = ({
  template,
  sideDrawer,
  getTemplate,
  resetTemplate,
  uploadOrgData,
  closeSideDrawer,
  openSideDrawer,
  step,
  setStep,
}) => {
  return (
    <div className={`control-panel ${!sideDrawer ? "side-drawer-close" : ""}`}>
      {/* <div className={`control-panel ${!sideDrawer ? "" : "side-drawer-close"}`}> */}
      {sideDrawer ? (
        <div className="toggler-btn" onClick={closeSideDrawer}>
          <i className="fas fa-chevron-left"></i>
        </div>
      ) : (
        <div className="open-icon" onClick={openSideDrawer}>
          <i class="fas fa-chevron-right"></i>
        </div>
      )}
      {sideDrawer && step === 1 && (
        <StepOne
          template={template}
          getTemplate={getTemplate}
          resetTemplate={resetTemplate}
          setStep={setStep}
        />
      )}
      {/* {sideDrawer && step === 2 && <StepTwo setStep={setStep} />} */}
      {sideDrawer && step === 2 && (
        <StepThree setStep={setStep} uploadOrgData={uploadOrgData} />
      )}
      {sideDrawer && step === 3 && <StepFour setStep={setStep} />}
    </div>
  );
};

const mapStateToProps = ({ template, sideDrawer, step }) => ({
  template,
  sideDrawer,
  step,
});

export default connect(mapStateToProps, {
  getTemplate,
  resetTemplate,
  uploadOrgData,
  closeSideDrawer,
  openSideDrawer,
  setStep,
})(ControlPanel);

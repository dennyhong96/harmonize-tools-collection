import React, { useState, Fragment, useRef, useEffect } from "react";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";

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
}) => {
  const [step, setStep] = useState(1);
  let tipRef = useRef();

  useEffect(() => {
    if (!sideDrawer) {
      ReactTooltip.show(tipRef);
    }
  }, [sideDrawer]);

  return (
    <Fragment>
      <div
        className={`control-panel ${!sideDrawer ? "side-drawer-close" : ""}`}
      >
        {/* <div className={`control-panel ${!sideDrawer ? "" : "side-drawer-close"}`}> */}
        {sideDrawer ? (
          <div className="toggler-btn" onClick={closeSideDrawer}>
            <i className="fas fa-chevron-left"></i>
          </div>
        ) : (
          <div
            className="open-icon"
            onClick={openSideDrawer}
            data-tip="Click to get started !"
            ref={(ref) => (tipRef = ref)}
          >
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
        {sideDrawer && step === 2 && <StepTwo setStep={setStep} />}
        {sideDrawer && step === 3 && (
          <StepThree setStep={setStep} uploadOrgData={uploadOrgData} />
        )}
        {sideDrawer && step === 4 && <StepFour setStep={setStep} />}
      </div>
      <ReactTooltip />
    </Fragment>
  );
};

const mapStateToProps = ({ template, sideDrawer }) => ({
  template,
  sideDrawer,
});

export default connect(mapStateToProps, {
  getTemplate,
  resetTemplate,
  uploadOrgData,
  closeSideDrawer,
  openSideDrawer,
})(ControlPanel);

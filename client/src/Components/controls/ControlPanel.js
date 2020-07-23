import React from "react";
import { connect } from "react-redux";

import StepOne from "./StepOne";
import { getTemplate } from "../../actions/csvTemplateActions";

const ControlPanel = ({ template, getTemplate }) => {
  return <StepOne getTemplate={getTemplate} />;
};

const mapStateToProps = ({ template }) => ({ template });

export default connect(mapStateToProps, { getTemplate })(ControlPanel);

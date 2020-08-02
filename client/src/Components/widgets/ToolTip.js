import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const ToolTip = ({ message, placement, delay, children }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement={placement} delay={delay} overlay={renderTooltip}>
      {children}
    </OverlayTrigger>
  );
};

export default ToolTip;

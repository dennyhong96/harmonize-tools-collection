import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const ToolTip = ({ message, placement, delay, children, show = true }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      delay={delay}
      overlay={renderTooltip}
      show={show}
    >
      {children}
    </OverlayTrigger>
  );
};

export default ToolTip;

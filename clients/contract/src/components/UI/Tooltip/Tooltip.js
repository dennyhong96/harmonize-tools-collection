import React from "react";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const ToolTip = ({ placement, tips, visible }) => {
  return (
    <span style={{ marginLeft: "10px"}}>
      <Tooltip placement={placement} defaultVisible={visible} autoAdjustOverflow='true' color={"#f9f2fc"} title={tips}>
        <InfoCircleOutlined style={{ color: "#49208d"}} />
      </Tooltip>
    </span>
  );
};
export default ToolTip;

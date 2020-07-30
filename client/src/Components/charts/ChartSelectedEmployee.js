import React from "react";
import { connect } from "react-redux";

import useDownload from "../../hooks/useDownload";
import { deleteNode } from "../../actions/orgChartActions";
import "./ChartSelectedEmployee.scss";

const ChartEmployeePanel = () => {
  const { handleDownload } = useDownload();

  return (
    <div className="action">
      <button onClick={() => handleDownload("JPG")}>Download JPG</button>
      <button onClick={() => handleDownload("PDF")}>Download PDF</button>
    </div>
  );
};

export default connect(null, { deleteNode })(ChartEmployeePanel);

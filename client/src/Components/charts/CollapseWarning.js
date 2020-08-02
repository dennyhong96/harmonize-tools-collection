import React from "react";
import { connect } from "react-redux";

import { expandAllNode } from "../../actions/orgChartActions";
import "./CollapseWarning.scss";

const CollapseWarning = ({ chart, expandAllNode }) => {
  return (
    <div className={`collapse-warning ${chart.collapsedChart ? "show" : ""}`}>
      <h3>
        <i class="far fa-minus-square"></i> Currently in collapsed mode, editing
        is disabled. <button onClick={expandAllNode}>Expand All</button>
      </h3>
    </div>
  );
};

export default connect(null, { expandAllNode })(CollapseWarning);

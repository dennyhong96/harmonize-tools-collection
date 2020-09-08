import React from "react";
import { connect } from "react-redux";

import { expandAllNode } from "../../actions/orgChartActions";
import "./CollapseWarning.scss";

const CollapseWarning = ({ chart, expandAllNode, sideDrawer }) => {
  return (
    <div
      className={`collapse-warning ${
        chart.collapsedChart && !sideDrawer ? "show" : ""
      }`}
    >
      <h3>
        <i class="far fa-minus-square"></i> Currently in collapsed mode, expand
        to edit chart.
        <button onClick={expandAllNode}>Expand</button>
      </h3>
    </div>
  );
};

const mapStateToProps = ({ sideDrawer }) => ({ sideDrawer });

export default connect(mapStateToProps, { expandAllNode })(CollapseWarning);

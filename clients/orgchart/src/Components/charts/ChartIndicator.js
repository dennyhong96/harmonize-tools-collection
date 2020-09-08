import React from "react";

import "./ChartIndicator.scss";

const ChartIndicator = ({ chart, sideDrawer }) => {
  return (
    <div className={`chart-indicator ${sideDrawer ? "with-drawer" : ""}`}>
      <h3>
        <i class="fas fa-network-wired"></i> Currenty working on:
        {!chart.currentChartId ? (
          <span>New chart</span>
        ) : (
          <span>
            {chart.chartList
              .find((c) => c._id === chart.currentChartId)
              .chartName.slice(0, 20)}
          </span>
        )}
      </h3>
    </div>
  );
};
export default ChartIndicator;

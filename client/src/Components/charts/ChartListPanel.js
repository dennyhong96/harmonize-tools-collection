import React, { useRef, useEffect } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import { editChart } from "../../actions/orgChartActions";
import "./ChartListPanel.scss";

const ChartListPanel = ({
  chart,
  editChart,
  chartListShow,
  setChartListShow,
  user,
}) => {
  const orgChartRef = useRef();

  useEffect(() => {
    orgChartRef.current = document.querySelector(".myChart");
  }, []);

  const handleSelectChart = (chart) => {
    editChart(chart, orgChartRef);
    setChartListShow(false);
  };

  return (
    <div
      className={`chart-list ${chartListShow && user ? "chart-list-show" : ""}`}
    >
      <div className="chart-list-close" onClick={() => setChartListShow(false)}>
        <i className="fas fa-times"></i>
      </div>
      <h3>Your charts on the cloud</h3>
      <div className="chart-list-inner">
        <Table striped bordered hover size="sm" className="chart-table">
          <thead>
            <tr>
              <th>Chart Name</th>
              <th>Date Created</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {chart.chartList &&
              chart.chartList.map((chart) => (
                <tr>
                  <td>{chart.chartName}</td>
                  <td>{new Date(chart.createdAt).toDateString()}</td>
                  <td className="load-td">
                    <button
                      className="load-btn"
                      onClick={() => handleSelectChart(chart)}
                    >
                      <i class="fas fa-cloud-download-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default connect(null, { editChart })(ChartListPanel);

import React from "react";
import { Table } from "react-bootstrap";

import "./ChartListPanel.scss";

const ChartListPanel = ({ chartListShow, setChartListShow }) => {
  return (
    <div className={`chart-list ${chartListShow ? "chart-list-show" : ""}`}>
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
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td className="load-td">
                <button className="load-btn">
                  <i class="fas fa-cloud-download-alt"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td className="load-td">
                <button className="load-btn">
                  <i class="fas fa-cloud-download-alt"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td className="load-td">
                <button className="load-btn">
                  <i class="fas fa-cloud-download-alt"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td className="load-td">
                <button className="load-btn">
                  <i class="fas fa-cloud-download-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ChartListPanel;

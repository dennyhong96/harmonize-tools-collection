import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import {
  createChart,
  loadCharts,
  startNewChart,
} from "../../actions/orgChartActions";
import { openSideDrawer } from "../../actions/sideDrawerAction";
import useDownload from "../../hooks/useDownload";
import "./ActionsPanel.scss";

const EmployeeInfoPanel = ({
  sideDrawer,
  user,
  createChart,
  loadCharts,
  setChartListShow,
  startNewChart,
  openSideDrawer,
}) => {
  const { handleDownload } = useDownload();
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowWidget(true);
    }, 1000);
  }, []);

  const handleLoadCharts = async () => {
    await loadCharts();
    setChartListShow(true);
  };

  return (
    <div className={`employee-card ${showWidget ? "employee-card-show" : ""}`}>
      {/* <div className="employee-card-close">
        <i className="fas fa-times"></i>
      </div> */}
      <div className="selected-employee">
        {user && <p className="name">Welcome, {user.name}</p>}
        {!user && <p className="name">Login for more functions</p>}
      </div>
      <ListGroup className="action-list">
        <ListGroup.Item
          className="action-item"
          as="button"
          action
          onClick={openSideDrawer}
        >
          <i class="mr-1 fas fa-file-csv"></i> Build from CSV
        </ListGroup.Item>
        <ListGroup.Item
          className="action-item"
          as="button"
          action
          onClick={startNewChart}
        >
          <i class="mr-1 fas fa-wrench"></i> Build from scratch
        </ListGroup.Item>
        <ListGroup.Item
          onClick={handleLoadCharts}
          className={`action-item ${!user ? "disabled" : ""}`}
          as="button"
          action
        >
          <i class="mr-1 far fa-window-maximize"></i> Load saved charts
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => createChart("default")}
          className={`action-item ${!user ? "disabled" : ""}`}
          as="button"
          action
        >
          <i class="mr-1 fas fa-cloud-upload-alt"></i> Save your chart
        </ListGroup.Item>

        <ListGroup.Item
          className="action-item"
          as="button"
          action
          onClick={() => handleDownload("PDF")}
        >
          <i class="mr-1 far fa-file-pdf"></i> Export to PDF
        </ListGroup.Item>
        <ListGroup.Item
          className="action-item"
          as="button"
          action
          onClick={() => handleDownload("JPG")}
        >
          <i class="mr-1 far fa-file-image"></i> Export to JPG
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

const mapStateToProps = ({ sideDrawer, user }) => ({ sideDrawer, user });

export default connect(mapStateToProps, {
  createChart,
  loadCharts,
  startNewChart,
  openSideDrawer,
})(EmployeeInfoPanel);

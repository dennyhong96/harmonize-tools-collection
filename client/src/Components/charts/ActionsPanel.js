import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import ReactTooltip from "react-tooltip";

import {
  createChart,
  loadCharts,
  startNewChart,
  updateChart,
} from "../../actions/orgChartActions";

import { openSideDrawer } from "../../actions/sideDrawerAction";
import SaveChartPopup from "./SaveChartPopup";
import useDownload from "../../hooks/useDownload";
import "./ActionsPanel.scss";

const EmployeeInfoPanel = ({
  sideDrawer,
  user,
  createChart,
  loadCharts,
  updateChart,
  setChartListShow,
  startNewChart,
  openSideDrawer,
  currentChartId,
}) => {
  const { handleDownload } = useDownload();
  const [showWidget, setShowWidget] = useState(false);
  const [savePopupShow, setSavePopupShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowWidget(true);
    }, 500);
  }, []);

  const handleLoadCharts = async () => {
    await loadCharts();
    setChartListShow(true);
  };

  const handleSave = () => {
    if (currentChartId) {
      updateChart(currentChartId);
    } else {
      setSavePopupShow(true);
    }
  };

  return (
    <Fragment>
      <div
        className={`employee-card ${showWidget ? "employee-card-show" : ""}`}
      >
        {/* <div className="employee-card-close">
        <i className="fas fa-times"></i>
      </div> */}
        <div className="selected-employee">
          {user && <p className="name">Welcome, {user.name}</p>}
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
          {user ? (
            <Fragment>
              <ListGroup.Item
                onClick={handleLoadCharts}
                className="action-item"
                as="button"
                action
              >
                <i class="mr-1 far fa-window-maximize"></i> Load saved charts
              </ListGroup.Item>
              <ListGroup.Item
                onClick={handleSave}
                className="action-item"
                as="button"
                action
              >
                <i class="mr-1 fas fa-cloud-upload-alt"></i> Save your chart
              </ListGroup.Item>
            </Fragment>
          ) : (
            <Fragment>
              <ListGroup.Item
                className="action-item disabled-item"
                as="button"
                data-tip="Sign in to use cloud functions"
                action
              >
                <i class="mr-1 far fa-window-maximize"></i> Load saved charts
              </ListGroup.Item>
              <ListGroup.Item
                className="action-item disabled-item"
                as="button"
                data-tip="Sign in to use cloud functions"
                action
              >
                <i class="mr-1 fas fa-cloud-upload-alt"></i> Save your chart
              </ListGroup.Item>
            </Fragment>
          )}

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
      <SaveChartPopup
        show={savePopupShow}
        onHide={() => setSavePopupShow(false)}
        setSavePopupShow={setSavePopupShow}
      />
      <ReactTooltip className="my-tooltip" />
    </Fragment>
  );
};

const mapStateToProps = ({ sideDrawer, user, chart: { currentChartId } }) => ({
  sideDrawer,
  user,
  currentChartId,
});

export default connect(mapStateToProps, {
  createChart,
  loadCharts,
  startNewChart,
  openSideDrawer,
  updateChart,
})(EmployeeInfoPanel);

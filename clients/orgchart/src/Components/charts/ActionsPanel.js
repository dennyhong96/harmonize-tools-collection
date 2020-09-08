import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";

import { List, ListItem, Typography } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import GridOnIcon from "@material-ui/icons/GridOn";
import BuildIcon from "@material-ui/icons/Build";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import ImageIcon from "@material-ui/icons/Image";
import GetAppIcon from "@material-ui/icons/GetApp";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import BackupIcon from "@material-ui/icons/Backup";

import {
  createChart,
  loadCharts,
  startNewChart,
  updateChart,
  toCSV,
} from "../../actions/orgChartActions";

import ExportPopup from "../charts/ExportPopup";
import ConfirmNewChartPopup from "./ConfirmNewChartPopup";
import ToolTip from "../widgets/ToolTip";
import { openSideDrawer } from "../../actions/sideDrawerAction";
import SaveChartPopup from "./SaveChartPopup";
import useDownload from "../../hooks/useDownload";
import { openToolTips } from "../../actions/tooltipActions";
import "./ActionsPanel.scss";

const EmployeeInfoPanel = ({
  user,
  createChart,
  loadCharts,
  updateChart,
  setChartListShow,
  startNewChart,
  openSideDrawer,
  currentChartId,
  toCSV,
  openToolTips,
  tooltip,
}) => {
  const { handleDownload } = useDownload();
  const [showWidget, setShowWidget] = useState(false);
  const [savePopupShow, setSavePopupShow] = useState(false);
  const [newChartPopupShow, setNewChartPopupShow] = useState(false);
  const [exportPopupShow, setExportPopupShow] = useState(false);

  const handleExport = async (format) => {
    if (format === "JPG") {
      handleDownload("JPG");
    } else if (format === "PDF") {
      handleDownload("PDF");
    } else if (format === "CSV") {
      toCSV();
    }
  };

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
        <div className="selected-employee">
          {user && <p className="name">Welcome, {user.name}</p>}
        </div>
        <List style={{ border: "1px solid #ddd", borderRadius: 10 }}>
          <ListItem
            button
            style={{
              paddingTop: 5,
              paddingBottom: 5,
            }}
            onClick={openToolTips}
          >
            <PlayCircleOutlineIcon style={{ fontSize: 18, marginRight: 8 }} />
            <Typography
              style={{
                margin: 0,
                fontSize: "0.7rem",
                fontWeight: 400,
                color: "#333",
              }}
            >
              Getting Started
            </Typography>
          </ListItem>
          <ListItem
            button
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor:
                tooltip.open && tooltip.step === 1 ? "#f1ecfb" : undefined,
            }}
            onClick={openSideDrawer}
          >
            <GridOnIcon style={{ fontSize: 18, marginRight: 8 }} />
            <Typography
              style={{
                margin: 0,
                fontSize: "0.7rem",
                fontWeight: 400,
                color: "#333",
              }}
            >
              Import from CSV
            </Typography>
          </ListItem>

          <ListItem
            button
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor:
                tooltip.open && (tooltip.step === 2 || tooltip.step === 3)
                  ? "#f1ecfb"
                  : undefined,
            }}
            onClick={() => setNewChartPopupShow(true)}
          >
            <BuildIcon style={{ fontSize: 18, marginRight: 8 }} />
            <Typography
              style={{
                margin: 0,
                fontSize: "0.7rem",
                fontWeight: 400,
                color: "#333",
              }}
            >
              New Chart
            </Typography>
          </ListItem>
          <ListItem
            button
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor:
                tooltip.open && tooltip.step === 4 ? "#f1ecfb" : undefined,
            }}
            onClick={() => handleExport("CSV")}
          >
            <GetAppIcon style={{ fontSize: 18, marginRight: 8 }} />
            <Typography
              style={{
                margin: 0,
                fontSize: "0.7rem",
                fontWeight: 400,
                color: "#333",
              }}
            >
              Download as CSV
            </Typography>
          </ListItem>
          <ListItem
            button
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor:
                tooltip.open && tooltip.step === 4 ? "#f1ecfb" : undefined,
            }}
            onClick={() => handleExport("PDF")}
          >
            <PictureAsPdfIcon style={{ fontSize: 18, marginRight: 8 }} />
            <Typography
              style={{
                margin: 0,
                fontSize: "0.7rem",
                fontWeight: 400,
                color: "#333",
              }}
            >
              Download as PDF
            </Typography>
          </ListItem>
          <ListItem
            button
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              backgroundColor:
                tooltip.open && tooltip.step === 4 ? "#f1ecfb" : undefined,
            }}
            onClick={() => handleExport("JPG")}
          >
            <ImageIcon style={{ fontSize: 18, marginRight: 8 }} />
            <Typography
              style={{
                margin: 0,
                fontSize: "0.7rem",
                fontWeight: 400,
                color: "#333",
              }}
            >
              Download as JPG
            </Typography>
          </ListItem>

          {!user ? (
            <Fragment>
              <ToolTip message="Sign in to use this feature.">
                <ListItem
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor:
                      tooltip.open && tooltip.step === 5
                        ? "#f1ecfb"
                        : undefined,
                    cursor: "default",
                  }}
                >
                  <CloudDownloadIcon
                    style={{ fontSize: 18, marginRight: 8, color: "#b3b3b3" }}
                  />
                  <Typography
                    style={{
                      margin: 0,
                      fontSize: "0.7rem",
                      fontWeight: 400,
                      color: "#b3b3b3",
                    }}
                  >
                    Load saved charts
                  </Typography>
                </ListItem>
              </ToolTip>

              <ToolTip message="Sign in to use this feature.">
                <ListItem
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor:
                      tooltip.open && tooltip.step === 5
                        ? "#f1ecfb"
                        : undefined,
                    cursor: "default",
                  }}
                >
                  <BackupIcon
                    style={{ fontSize: 18, marginRight: 8, color: "#b3b3b3" }}
                  />
                  <Typography
                    style={{
                      margin: 0,
                      fontSize: "0.7rem",
                      fontWeight: 400,
                      color: "#b3b3b3",
                    }}
                  >
                    Save your chart
                  </Typography>
                </ListItem>
              </ToolTip>
            </Fragment>
          ) : (
            <Fragment>
              <ListItem
                button
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor:
                    tooltip.open && tooltip.step === 5 ? "#f1ecfb" : undefined,
                }}
                disabled={!user}
                onClick={handleLoadCharts}
              >
                <CloudDownloadIcon style={{ fontSize: 18, marginRight: 8 }} />
                <Typography
                  style={{
                    margin: 0,
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    color: "#333",
                  }}
                >
                  Load saved charts
                </Typography>
              </ListItem>

              <ListItem
                button
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor:
                    tooltip.open && tooltip.step === 5 ? "#f1ecfb" : undefined,
                }}
                disabled={!user}
                onClick={handleSave}
              >
                <BackupIcon style={{ fontSize: 18, marginRight: 8 }} />
                <Typography
                  style={{
                    margin: 0,
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    color: "#333",
                  }}
                >
                  Save your chart
                </Typography>
              </ListItem>
            </Fragment>
          )}
        </List>
      </div>

      <SaveChartPopup
        show={savePopupShow}
        onHide={() => setSavePopupShow(false)}
        setSavePopupShow={setSavePopupShow}
        createChart={createChart}
      />
      <ConfirmNewChartPopup
        show={newChartPopupShow}
        onHide={() => setNewChartPopupShow(false)}
        setNewChartPopupShow={setNewChartPopupShow}
        startNewChart={startNewChart}
      />
      <ExportPopup
        show={exportPopupShow}
        onHide={() => setExportPopupShow(false)}
        setExportPopupShow={setExportPopupShow}
        toCSV={toCSV}
      />
    </Fragment>
  );
};

const mapStateToProps = ({
  sideDrawer,
  user,
  chart: { currentChartId },
  tooltip,
}) => ({
  sideDrawer,
  user,
  currentChartId,
  tooltip,
});

export default connect(mapStateToProps, {
  createChart,
  loadCharts,
  startNewChart,
  openSideDrawer,
  updateChart,
  toCSV,
  openToolTips,
})(EmployeeInfoPanel);

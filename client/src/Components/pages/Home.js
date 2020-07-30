import React, { Fragment } from "react";
import { Container } from "react-bootstrap";

import Topbar from "../layout/Topbar";
import ControlPanel from "../controls/ControlPanel";
import OrgChart from "../charts/OrgChart";

const Home = () => {
  return (
    <div className="app-home">
      <Topbar />
      <ControlPanel />
      <Container fluid>
        <OrgChart />
      </Container>
    </div>
  );
};

export default Home;

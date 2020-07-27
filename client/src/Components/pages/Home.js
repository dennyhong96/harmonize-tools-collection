import React, { Fragment } from "react";
import { Container } from "react-bootstrap";

import Topbar from "../layout/Topbar";
import ControlPanel from "../controls/ControlPanel";
import OrgChart from "../charts/OrgChart";

const Home = () => {
  return (
    <Fragment>
      <Topbar />
      <ControlPanel />
      <Container fluid>
        <OrgChart />
      </Container>
    </Fragment>
  );
};

export default Home;

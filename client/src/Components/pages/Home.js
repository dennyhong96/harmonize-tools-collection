import React, { Fragment } from "react";
import { Container } from "react-bootstrap";

import ControlPanel from "../controls/ControlPanel";
import OrgChart from "../charts/OrgChart";

const Home = () => {
  return (
    <Fragment>
      <ControlPanel />
      <Container fluid>
        <OrgChart />
      </Container>
    </Fragment>
  );
};

export default Home;

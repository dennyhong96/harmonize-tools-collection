import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import ControlPanel from "../controls/ControlPanel";
import OrgChart from "../charts/OrgChart";

const Home = () => {
  return (
    <Container fluid>
      <ControlPanel />
      <OrgChart />
    </Container>
  );
};

export default Home;

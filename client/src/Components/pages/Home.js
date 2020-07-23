import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import ControlPanel from "../controls/ControlPanel";
import OrgChart from "../charts/OrgChart";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 2 }}>
          <ControlPanel />
        </Col>
        <Col md={{ span: 10 }}>
          <OrgChart />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Home from "./Components/pages/Home";
import "./App.scss";

const App = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 2 }}></Col>
        <Col md={{ span: 10 }}>
          <Home />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

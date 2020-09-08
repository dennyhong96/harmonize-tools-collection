import React from "react";
import Navigation from "../../../Navigation/Navigation";
import GeneratePdf from "./GeneratePdf";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../../../UI/Title/Title";

const PDF = (props) => {
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Navigation />
        </Col>

        <Col>
          {" "}
          <Title />
          <GeneratePdf />
        </Col>
      </Row>
    </Container>
  );
};

export default PDF;

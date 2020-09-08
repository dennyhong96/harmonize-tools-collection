import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Feature1 from "../../../Assets/feature1.png";
import Feature2 from "../../../Assets/feature2.png";
import Feature3 from "../../../Assets/feature3.png";
import FormImg from "../../../Assets/form.png";
import "./MainFeature.css";

export default function MainFeature() {
  return (
    <section className="main-feature">
      <Container>
        <div className="text-box text-center">
          <h2>Only in two simple steps.</h2>
        </div>

        <Row style={{ marginTop: "3rem" }}>
          <Col className="mb-md-5 d-flex align-items-center" xl={{ span: 6 }}>
            <img src={FormImg} alt="feature 1" className="feature-img" />
          </Col>

          <Col className="mb-md-5 d-flex align-items-center" xl={{ span: 6 }}>
            <div className="text-box">
              <br />
              <h3>
                1. Fill out questions to generate your customized Non-Disclosure
                Agreement.
              </h3>
              <br />
              <h3>2. Download the form to your computer.</h3>
            </div>
          </Col>
        </Row>

        <Row className="feature-section">
          <Col lg={{ span: 4 }}>
            <img src={Feature1} alt="feature 1" className="feature-img" />
            <h2>FREE!</h2>
          </Col>
          <Col lg={{ span: 4 }}>
            <img src={Feature2} alt="feature 2" className="feature-img" />
            <h2>No sign-up</h2>
          </Col>
          <Col lg={{ span: 4 }}>
            <img src={Feature3} alt="feature 3" className="feature-img" />
            <h2>Step-by-step</h2>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

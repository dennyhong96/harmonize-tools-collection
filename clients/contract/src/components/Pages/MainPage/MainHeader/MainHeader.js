import React from "react";
import './MainHeader.css'
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MainHeaderImg from "../../../Assets/MainHeader.png"

export default function MainHeader() {
  return (
    <section className="main-header">
      <Container>
        <Row>
          <Col>
            <div className="text-box" md={{ span: 8 }}>
              <div>
                <h3>Custom legal forms</h3>
                <h1>New Hires? No Problem.</h1>
                <p>
                  Create a free customized Non-Disclosure Agreement in just a
                  few minutes using Harmonize's free contract building tool.
                </p>
                <div>
                  <button className="call-to-action"><Link to="/getStarted">Try Now</Link></button>
                </div>
              </div>
            </div>
          </Col>
          <Col className="d-none d-lg-block">
            <div>
              <img
                src={MainHeaderImg}
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

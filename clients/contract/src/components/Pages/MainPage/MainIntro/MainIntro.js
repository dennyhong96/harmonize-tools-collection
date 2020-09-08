import React from "react";
import "./MainIntro.css";
import { Container, Row, Col } from "react-bootstrap";
import MainIntroImg from "../../../Assets/MainIntro.png";
export default function MainIntro() {
  return (
    <section className="main-introduction">
      <Container>
        <Row>
          <Col className="mb-md-5 d-flex align-items-center" xl={{ span: 4 }}>
            <img src={MainIntroImg} alt="feature 1" className="feature-img" />
          </Col>

          <Col className="mb-md-5 d-flex align-items-center" xl={{ span: 8 }}>
            <div className="text-box">
              <h2>What is a Non-Disclosure Agreement?</h2>
              <p>
                A Non-Disclosure Agreement is a legally enforceable contract
                that protects information that should be kept secret. Examples
                include test results, software, passwords, and system
                specifications. The NDA includes a definition of what is
                considered confidential, what is excluded from confidentiality,
                the receiving party’s obligations, time periods, and choice of
                law.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

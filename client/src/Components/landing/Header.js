import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <section className="landing-header">
      <Container>
        <Row>
          <Col className="d-none d-md-block">
            <div className="py-5 border text-center mt-5">
              NEED AN ILLUSTRATION HERE
            </div>
          </Col>
          <Col>
            <div className="text-box">
              <div>
                <h1>Meet the easiest org chart software on the planet</h1>
                <p>
                  Built for the modern HR. Our org chart software allows you to
                  quickly and easily view your organization's structure.
                </p>
                <div className="call-to-action">
                  <Link to="/app">Try for free</Link>
                </div>
                <small className="mt-4 d-block text-light">
                  <i className="far fa-check-square mr-1"></i> No login required
                </small>
              </div>
            </div>
          </Col>
        </Row>
        <div className="custom-shape-divider-bottom-1595838147">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </Container>
    </section>
  );
};

export default Header;

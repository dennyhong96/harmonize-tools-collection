import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import HeaderImg from "../../assets/jumbo.svg";
import "./Header.scss";

const Header = () => {
  return (
    <section className="landing-header">
      <Container>
        <Row>
          <Col xs={12} md={6} className="">
            <div className="">
              <img src={HeaderImg} className="header-img" alt="meet the team" />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="text-box">
              <div>
                <h1>Meet the easiest org chart software on the planet</h1>
                <p>
                  Built for modern HR departments - our free org chart software
                  allows you to quickly and easily view your organization’s
                  structure.
                </p>
                <div className="call-to-action">
                  <Link to="/orgchart/app">Try now</Link>
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

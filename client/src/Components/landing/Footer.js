import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import HarmonizeLogo from "../../assets/logo.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="landing-footer text-light">
      <div className="custom-shape-divider-top-1595838197">
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

      <div className="footer-content">
        <Container>
          <Row>
            <Col md={{ span: 6 }}>
              <div className="footer-section1">
                <div>
                  <img
                    src={HarmonizeLogo}
                    alt="Harmonize Logo"
                    width="50"
                    height="50"
                  />
                  <h3>Harmonize</h3>
                </div>
                <span>
                  Harmonize is a chat-based HR system that brings in the
                  benefits of collaboration and automation to everday mundane
                  tasks in workplaces. It allows people to achieve more by doing
                  less.
                </span>
              </div>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <Row>
                <Col md={{ span: 6 }}>
                  <div className="footer-section2">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/about.html"
                        >
                          About
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/contact.html"
                        >
                          Contact us
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.attendancebot.com/blog/"
                        >
                          Blog
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/tos.html"
                        >
                          Terms of Service
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={{ span: 6 }}>
                  <div className="footer-section3">
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/attendancebot.html"
                        >
                          AttendanceBot
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/officeamp.html"
                        >
                          OfficeAmp
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.harmonizehq.com/expensetron.html"
                        >
                          ExpenseTron
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6 }}>
              <div className="footer-section4">
                © 2020 Anaek Inc. All rights reserved.
              </div>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <div className="footer-section5">
                <ul>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://twitter.com/harmonizehq"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.linkedin.com/company/harmonizehq/"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="mailto:hi@harmonizehq.com"
                    >
                      <i className="far fa-envelope"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.attendancebot.com/blog/"
                    >
                      <i className="fab fa-medium-m"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

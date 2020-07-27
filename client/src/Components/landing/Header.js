import React from "react";
import { Row, Col, Container } from "react-bootstrap";

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
                <h1>
                  <span>Org Chart</span> - Visualize your organization
                  structure.
                </h1>
                <p>
                  Org Chart is a free and open source organization structure
                  visualization tool developed by Harmonize
                </p>
                <div className="call-to-action">
                  <a>Try now</a>
                  <a>More HR tools</a>
                </div>
                <small className="mt-2 d-block text-light">
                  Login not required !
                </small>
              </div>
            </div>
          </Col>
        </Row>
        <div class="custom-shape-divider-bottom-1595817112">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </Container>
    </section>
  );
};

export default Header;

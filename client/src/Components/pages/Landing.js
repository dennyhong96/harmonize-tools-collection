import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import Header from "../landing/Header";
import ChartDemo from "../../assets/orgchart-demo.png";
import Navbar from "../layout/Navbar";
import "./Landing.scss";

const Landing = () => {
  return (
    <section className="landing">
      <Navbar />
      <Header />

      <section className="showcase text-center">
        <Container>
          <h2>See Org Chart in action</h2>
          <img src={ChartDemo} alt="Chart Demo" />
          <p className="greyed-out mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            accusamus, fuga officiis in at a quo voluptas modi optio facere
            iusto distinctio dolorem, beatae alias?
          </p>
        </Container>
      </section>
      <section className="features text-center">
        <Container>
          <h2>Features</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            hic.
          </p>
          <Row>
            <Col xs={{ span: 6 }}>
              <div className="feature-card">
                <h3 className="feature-title">CSV to Org Chart</h3>
                <p className="feature-text">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
                  similique repellat molestias fuga fugit esse, vitae ad
                  nesciunt.
                </p>
              </div>
            </Col>
            <Col xs={{ span: 6 }}>
              <div className="mt-3 text-muted border py-5">
                NEED AN ILLUSTRATION HERE
              </div>
            </Col>
            <Col xs={{ span: 6 }}>
              <div className="mt-3 text-muted border py-5">
                NEED AN ILLUSTRATION HERE
              </div>
            </Col>
            <Col xs={{ span: 6 }}>
              <div className="feature-card">
                <h3 className="feature-title">Re-arrange Hierarchy</h3>
                <p className="feature-text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Rerum quidem qui aliquam laudantium dolore quaerat quibusdam
                  ullam eveniet soluta exercitationem!
                </p>
              </div>
            </Col>
            <Col xs={{ span: 6 }}>
              <div className="feature-card">
                <h3 className="feature-title">Add / Remove Employees</h3>
                <p className="feature-text">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Iusto ipsa quis quia qui? Quae adipisci soluta sapiente
                  voluptatum, quasi inventore.
                </p>
              </div>
            </Col>
            <Col xs={{ span: 6 }}>
              <div className="mt-3 text-muted border py-5">
                NEED AN ILLUSTRATION HERE
              </div>
            </Col>
            <Col xs={{ span: 6 }}>
              <div className="mt-3 text-muted border py-5">
                NEED AN ILLUSTRATION HERE
              </div>
            </Col>
            <Col xs={{ span: 6 }}>
              <div className="feature-card">
                <h3 className="feature-title">One-click Export</h3>
                <p className="feature-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quisquam tenetur soluta totam doloremque, modi ipsa vitae
                  nihil illum.
                </p>
              </div>
            </Col>
            <Col xs={{ span: 6 }}>
              <div className="feature-card">
                <h3 className="feature-title">Free to Use!</h3>
                <p className="feature-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  alias dolorem consequuntur? Quaerat, corporis dolorum!
                </p>
                <a className="feature-btn">Try Now</a>
              </div>
            </Col>
            <Col xs={{ span: 6 }}>
              <div className="mt-3 text-muted border py-5">
                NEED AN ILLUSTRATION HERE
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <footer>
        <div class="custom-shape-divider-top-1595828527">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="footer-content py-5"></div>
      </footer>
    </section>
  );
};

export default Landing;

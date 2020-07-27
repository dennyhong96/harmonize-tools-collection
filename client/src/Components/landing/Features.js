import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Features.scss";

const Features = () => {
  return (
    <section className="landing-features text-center">
      <Container>
        <h2>Features</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, hic.
        </p>
        <Row>
          <Col md={{ span: 6 }}>
            <div className="mt-3 text-muted border py-5">
              NEED AN ILLUSTRATION HERE
            </div>
          </Col>
          <Col md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">CSV to Org Chart</h3>
              <p className="feature-text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
                similique repellat molestias fuga fugit esse, vitae ad nesciunt.
              </p>
            </div>
          </Col>
          <Col md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">Re-arrange Hierarchy</h3>
              <p className="feature-text">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
                quidem qui aliquam laudantium dolore quaerat quibusdam ullam
                eveniet soluta exercitationem!
              </p>
            </div>
          </Col>
          <Col md={{ span: 6 }}>
            <div className="mt-3 text-muted border py-5">
              NEED AN ILLUSTRATION HERE
            </div>
          </Col>

          <Col md={{ span: 6 }}>
            <div className="mt-3 text-muted border py-5">
              NEED AN ILLUSTRATION HERE
            </div>
          </Col>
          <Col md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">Add / Remove Employees</h3>
              <p className="feature-text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto
                ipsa quis quia qui? Quae adipisci soluta sapiente voluptatum,
                quasi inventore.
              </p>
            </div>
          </Col>
          <Col md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">One-click Export</h3>
              <p className="feature-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam tenetur soluta totam doloremque, modi ipsa vitae nihil
                illum.
              </p>
            </div>
          </Col>
          <Col md={{ span: 6 }}>
            <div className="mt-3 text-muted border py-5">
              NEED AN ILLUSTRATION HERE
            </div>
          </Col>
          <Col md={{ span: 6 }}>
            <div className="mt-3 text-muted border py-5">
              NEED AN ILLUSTRATION HERE
            </div>
          </Col>
          <Col md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">Free to Use!</h3>
              <p className="feature-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                alias dolorem consequuntur? Quaerat, corporis dolorum!
              </p>
              <Link to="/app" className="feature-btn">
                Try Now
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;

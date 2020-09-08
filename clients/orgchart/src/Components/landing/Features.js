import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import Feature1 from "../../assets/feature1.svg";
import Feature2 from "../../assets/feature2.svg";
import Feature3 from "../../assets/feature3.svg";
import Feature4 from "../../assets/feature4.svg";
import Feature5 from "../../assets/feature5.svg";

import "./Features.scss";

const Features = () => {
  return (
    <section className="landing-features text-center">
      <Container>
        <h2>Features</h2>
        <p className="sub">Modern HR problems require modern solutions</p>
        <Row>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <img src={Feature1} alt="feature 1" className="feature-img" />
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">Import your data</h3>
              <p className="feature-text">
                Create your org chart in minutes. Just download our template and
                upload your employee data, or start building from scratch.
              </p>
            </div>
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">Customize your organization</h3>
              <p className="feature-text">
                Simply drag and drop employees to move them around, and edit
                their profiles to add relevant information.
              </p>
            </div>
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <img src={Feature2} alt="feature 2" className="feature-img" />
          </Col>

          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <img src={Feature3} alt="feature 3" className="feature-img" />
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">Add & Remove Employees</h3>
              <p className="feature-text">
                Dynamically update your chart to accurately reflect your growing
                organization.
              </p>
            </div>
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">Share your chart</h3>
              <p className="feature-text">
                Automatically download your org chart as a jpg image or pdf with
                a single click.
              </p>
            </div>
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <img src={Feature4} alt="feature 4" className="feature-img" />
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <img src={Feature5} alt="feature 5" className="feature-img" />
          </Col>
          <Col className="mb-md-5 d-flex align-items-center" md={{ span: 6 }}>
            <div className="feature-card">
              <h3 className="feature-title">Free to Use!</h3>
              <p className="feature-text">
                Completely free to use - no credit card info required & no sign
                up necessary.
              </p>
              <Link to="/orgchart/app" className="feature-btn">
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

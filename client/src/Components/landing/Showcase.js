import React from "react";
import { Container } from "react-bootstrap";

import ChartDemo from "../../assets/orgchart-demo.png";
import "./Showcase.scss";

const Showcase = () => {
  return (
    <section className="ladning-showcase text-center">
      <Container>
        <h2>Visually understand where everyone in your organization fits!</h2>
        <img src={ChartDemo} alt="Chart Demo" />
        <p className="greyed-out mt-5">
          Our org chart software is simple, interactive, and powerful so you can
          understand your team, hire better, and increase productivity.
        </p>
      </Container>
    </section>
  );
};

export default Showcase;

import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import ToolTip from "../widgets/ToolTip";
import ChartDemo from "../../assets/orgchart-demo.png";
import "./Showcase.scss";

const Showcase = ({ history }) => {
  const handleClick = () => {
    history.push("/app");
  };
  return (
    <section className="ladning-showcase text-center">
      <Container>
        <h2>Visually understand where everyone in your organization fits!</h2>
        <ToolTip message="Try for free" delay={{ show: 500, hide: 250 }}>
          <img src={ChartDemo} alt="Chart Demo" onClick={handleClick} />
        </ToolTip>
        <div className="call-to-action my-4">
          <Link to="/app">Try for free</Link>
        </div>
        <p className="greyed-out">
          Our org chart software is simple, interactive, and powerful so you can
          understand your team, hire better, and increase productivity.
        </p>
      </Container>
    </section>
  );
};

export default Showcase;

import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import ToolTip from "../widgets/ToolTip";
import ChartDemo from "../../assets/orgchart-demo.png";
import "./Showcase.scss";

const Showcase = ({ history }) => {
  const handleClick = () => {
    history.push("/orgchart/app");
  };

  return (
    <section className="ladning-showcase text-center">
      <Container>
        <h2>Visualize your organization's structure.</h2>
        <ToolTip message="Try for free" delay={{ show: 500, hide: 250 }}>
          <img src={ChartDemo} alt="Chart Demo" onClick={handleClick} />
        </ToolTip>
        <p className="greyed-out my-5">
          Our org chart software is simple, interactive, and powerful so you can
          understand your team, hire better, and increase productivity.
        </p>
        <div className="call-to-action mb-5">
          <Link to="/orgchart/app">Try now</Link>
        </div>
      </Container>
    </section>
  );
};

export default Showcase;

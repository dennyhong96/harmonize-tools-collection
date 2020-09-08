import React from 'react'
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MainCTA.css"

export default function MainCTA() {
    return (
        <section className="cta-section text-center">
        <Container>
          <h2>
          Get ready to Harmonize your teams.
          </h2>
          <div>
            <button className="call-to-action">
            <Link to="/getStarted">Try Now</Link>
            </button>
          </div>
        </Container>
      </section>
    )
}

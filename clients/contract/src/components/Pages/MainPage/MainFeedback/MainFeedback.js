import React from "react";
import { Container } from "react-bootstrap";
import "./MainFeedback.css";

export default function MainFeedback() {
  return (
    <section className="feadback-section text-center">
      <Container>
        <h2>
          {" "}
          Want to help make this tool better? We would love to hear from you!
        </h2>
        <div>
          <button className="call-to-action">
            <a href="https://forms.gle/ZXhVBiYeyCuMKV8t5">Send Feedback</a>
          </button>
        </div>
      </Container>
    </section>
  );
}

import React from "react";
import "./Footer.css";
import logo from "../../Assets/harmonize_logo.png";

export default function Footer() {
  return (
    <div className="footer">
      <a
        style={{ textDecorationLine: "none" }}
        href="https://www.harmonizehq.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          src={logo}
          alt="harmonize_logo"
          width="42"
          height="30"
          style={{ marginBottom: "10px" }}
        />
        <span className="footer-text">Powered by Harmonizehq</span>
      </a>
    </div>
  );
}

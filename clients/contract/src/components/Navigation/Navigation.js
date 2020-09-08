import React from "react";
import "./Navigation.scss";
import { Link, useLocation } from "react-router-dom";

import path from "../../utils/path";

export default function Navigation() {
  const location = useLocation();

  return (
    <div className="side-nav">
      <nav>
        <ul className="side-nav__steps">
          <li
            className={`side-nav__steps__item ${
              location.pathname === path("/general") ? "active" : ""
            }`}
          >
            <Link className="sidebar-item" to="/general">
              General
            </Link>
          </li>

          <li
            className={`side-nav__steps__item ${
              location.pathname === path("/disclosing") ? "active" : ""
            }`}
          >
            <Link className="sidebar-item" to="/disclosing">
              Disclosing Party
            </Link>
          </li>

          <li
            className={`side-nav__steps__item ${
              location.pathname === path("/recieving") ? "active" : ""
            }`}
          >
            <Link className="sidebar-item" to="/recieving">
              Receiving Party
            </Link>
          </li>

          <li
            className={`side-nav__steps__item ${
              location.pathname === path("/partiesRelationship") ? "active" : ""
            }`}
          >
            <Link className="sidebar-item" to="/partiesRelationship">
              Parties Relationship
            </Link>
          </li>
          <li
            className={`side-nav__steps__item ${
              location.pathname === path("/confidentiality") ? "active" : ""
            }`}
          >
            <Link className="sidebar-item" to="/confidentiality">
              Confidentiality
            </Link>
          </li>

          <li
            className={`side-nav__steps__item ${
              location.pathname === path("/otherInformation") ? "active" : ""
            }`}
          >
            <Link className="sidebar-item" to="/otherInformation">
              Other Information
            </Link>
          </li>
          <li
            className={`side-nav__steps__item ${
              location.pathname === path("/timePeriod") ? "active" : ""
            }`}
          >
            <Link className="sidebar-item" to="/timePeriod">
              Time Period
            </Link>
          </li>
        </ul>
      </nav>
      <button className="side-nav__review-btn">Review</button>
    </div>
  );
}

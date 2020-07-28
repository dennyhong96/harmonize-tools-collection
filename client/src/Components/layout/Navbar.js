import React, { useRef, useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Navbar.scss";
import HarmonizeLogo from "../../assets/logo.png";

const _Navbar = () => {
  const docRef = useRef();
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    docRef.current = document.querySelector(".navbar");

    function setNavbarBg() {
      if (window.scrollY > 80) {
        setDarkTheme(false);
      } else {
        setDarkTheme(true);
      }
    }
    document.addEventListener("scroll", setNavbarBg);
    return () => document.removeEventListener("scroll", setNavbarBg);
  }, []);

  return (
    <Navbar
      fixed="top"
      variant={darkTheme ? "dark" : "light"}
      collapseOnSelect
      expand="md"
    >
      <Container>
        <Navbar.Brand
          href="https://www.harmonizehq.com/"
          target="_blank"
          rel="noopener noreferer"
        >
          <img
            src={HarmonizeLogo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Harmonize Logo"
          />
          <h3>Harmonize</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ml-auto">
            <Link className="my-navlink" to="/app">
              Create an org chart
            </Link>
            <a
              className="my-navlink"
              href="https://www.harmonizehq.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              More HR Tools
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default _Navbar;

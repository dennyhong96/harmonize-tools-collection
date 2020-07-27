import React, { useRef, useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import "./Navbar.scss";
import HarmonizeLogo from "../../assets/logo.png";

const _Navbar = () => {
  const docRef = useRef();
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    docRef.current = document.querySelector(".navbar");
    document.addEventListener("scroll", function () {
      if (window.scrollY > 80) {
        setDarkTheme(false);
      } else {
        setDarkTheme(true);
      }
    });
  }, []);

  return (
    <Navbar
      fixed="top"
      variant={darkTheme ? "dark" : "light"}
      collapseOnSelect
      expand="md"
    >
      <Container>
        <Navbar.Brand href="#home">
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
            <a className="my-navlink" href="#features">
              Enter Org Chart
            </a>
            <a className="my-navlink" href="#pricing">
              Explore Harmonize
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default _Navbar;

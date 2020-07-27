import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import "./Navbar.scss";
import HarmonizeLogo from "../../assets/logo.png";

const _Navbar = () => {
  return (
    <Navbar fixed="top" variant="dark">
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
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Org Chart</Nav.Link>
          <Nav.Link href="#pricing">Harmonize</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default _Navbar;

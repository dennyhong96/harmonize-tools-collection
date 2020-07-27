import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import "./Navbar.scss";
import HarmonizeLogo from "../../assets/logo.png";

const _Navbar = () => {
  return (
    <Navbar fixed="top">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default _Navbar;

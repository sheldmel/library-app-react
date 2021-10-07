import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "./Logo";
const Topbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand style={{ marginLeft: "2%" }}>
        <img
          alt=""
          src="/images/logo.jpg"
          width="50"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        E-Library
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#link">My books</Nav.Link>
          <Nav.Link href="/login">Sign Out</Nav.Link>
        </Nav>
        <Nav style={{ marginRight: "2%" }} className="mr-auto">
          <Navbar.Text>Welcome, Shelton</Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Topbar;

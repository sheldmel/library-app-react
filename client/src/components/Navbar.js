import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "./Logo";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Topbar = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  //const user = localStorage.getItem("userInfo")
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };
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
          <Nav.Link href="/mybooks">My books</Nav.Link>
          <Nav.Link onClick={logoutHandler}>Sign Out</Nav.Link>
        </Nav>
        <Nav style={{ marginRight: "2%" }} className="mr-auto">
          <Navbar.Text>Welcome, {userInfo.firstName}</Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Topbar;

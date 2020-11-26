import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { LinkContainer } from "react-router-bootstrap";

const Header = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Thales</Navbar.Brand>
      </LinkContainer>

      <Nav className="mr-auto">
        <LinkContainer to="/">
          <Nav.Link>Mon service</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          {props.loginStatus ? (
            <Nav.Link>Logout</Nav.Link>
          ) : (
            <Nav.Link>Login</Nav.Link>
          )}
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default Header;

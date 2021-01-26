import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./header.module.css";
import Logo from "./logo.webp";

const Header = (props) => {
  return (
    <Navbar className={styles.navbar} variant="dark" expand="lg" collapseOnSelect>
      <LinkContainer to="/">
        <Navbar.Brand>
          <img className={styles.img} src={Logo} alt="logo"></img>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/">
            <Nav.Link className="mx-3">Mon service</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            {props.loginStatus ? (
              <Nav.Link className="mx-3">Logout</Nav.Link>
            ) : (
              <Nav.Link className="mx-3">Login</Nav.Link>
            )}
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

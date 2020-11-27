import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./header.module.css";
import Logo from "./logo.webp"

const Header = (props) => {
  return (
    <Navbar className={styles.navbar} variant="dark" >
      <LinkContainer to="/">
        <Navbar.Brand ><img className={styles.img} src={Logo} alt="logo"></img></Navbar.Brand>
      </LinkContainer>

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
    </Navbar>
  );
};

export default Header;

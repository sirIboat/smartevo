import React from "react";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import firebase from "../firebase";
import "firebase/auth";
import "./Navbar.css";

function Menubar({ serial, clearSerial }) {
  const logout = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        clearSerial();
      });
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#"> Smart Pulz </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Button className="btn-nav" onClick={logout} variant="danger">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menubar;

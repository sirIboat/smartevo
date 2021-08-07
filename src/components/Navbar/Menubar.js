import React from "react";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import firebase from "../firebase";
import "firebase/auth";
import "./Navbar.css";
import { FiAlignRight } from "react-icons/fi";

function Menubar({ email, serial, clearSerial }) {
  const logout = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        clearSerial();
      });
  };

  // console.log(serial)
  return (
    <>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"> Smart Pulz </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>

              {/* <Nav.Link href="#link">{email}</Nav.Link> */}
              <NavDropdown title={serial} id="basic-nav-dropdown">
                {/*  <NavDropdown.Item href="history">History</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Export</NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item  >
                  <Button className="btn-nav" onClick={logout} variant="danger">
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menubar;

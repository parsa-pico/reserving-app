import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import { isAdmin, isNormalUser } from "./common/UserControl";
import { app } from "./realmConfig";

export default function NavBarComponent() {
  const location = useLocation();
  const user = app.currentUser;
  return (
    <Navbar className="fs-1" bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand className="fs-1" href="/">
          Reserving app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <ul className="navbar-nav p-1">
              <li className="nav-item">
                <NavLink className="nav-link" to="/reserving">
                  reserving page
                </NavLink>
              </li>
              {isAdmin() && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/add-times">
                    add times
                  </NavLink>
                </li>
              )}
              {!isNormalUser() && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
              {isNormalUser() && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={"/logout"}
                    state={{ prevLocation: location.pathname }}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
              {!isNormalUser() && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              )}
              {isNormalUser() && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {user.profile.email}
                  </NavLink>
                </li>
              )}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

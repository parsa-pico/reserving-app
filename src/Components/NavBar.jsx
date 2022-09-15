import React from "react";
import { NavLink } from "react-router-dom";
import { app } from "./realmConfig";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav p-1">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              reserving page
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/add-times">
              add times
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          {app.currentUser && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          )}
          {!app.currentUser && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          )}
          {app.currentUser && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                {app.currentUser.profile.email}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

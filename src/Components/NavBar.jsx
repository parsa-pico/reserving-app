import React from "react";
import { NavLink } from "react-router-dom";

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
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

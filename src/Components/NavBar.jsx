import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              reserving page
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/add-times">
              adding times
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

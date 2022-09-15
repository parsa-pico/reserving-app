import React from "react";
import { NavLink } from "react-router-dom";
import { app } from "./realmConfig";

export default function NavBar() {
  const user = app.currentUser;
  // const { isAdmin } = user.customData;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav p-1">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              reserving page
            </NavLink>
          </li>
          {user && user.customData && user.customData.isAdmin === true && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-times">
                add times
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                {user.profile.email}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

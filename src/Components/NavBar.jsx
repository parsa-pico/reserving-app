import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { isAdmin, isNormalUser } from "./common/UserControl";
import { app } from "./realmConfig";

export default function NavBar() {
  const location = useLocation();
  const user = app.currentUser;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav p-1">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
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
      </nav>
    </div>
  );
}

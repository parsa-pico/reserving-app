import React from "react";
import { app } from "./../realmConfig";

export default function ProtectedRoute({ children }) {
  const user = app.currentUser;
  if (user && user.customData && user.customData.isAdmin === true)
    return children;
  return <h2>you dont have that premission</h2>;
}

import React from "react";
import { app } from "./../realmConfig";
import { isAdmin } from "./UserControl";
// TODO: make condition dynamic
export default function ProtectedRoute({ children, conditionFunc }) {
  if (conditionFunc()) return children;
  return <h2>you dont have that premission</h2>;
}

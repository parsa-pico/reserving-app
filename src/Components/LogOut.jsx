import React, { useEffect } from "react";
import { app } from "./realmConfig";

export default function LogOut() {
  useEffect(() => {
    handleLogOut();
  }, []);
  async function handleLogOut() {
    await app.currentUser.logOut();
    window.location = "/";
    console.log(app.currentUser);
  }
}

import React, { useState } from "react";
import * as Realm from "realm-web";
import { app } from "./realmConfig";
export default function Login() {
  const [loginId, setLoginId] = useState("");
  async function login() {
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    setLoginId(user.id);
  }

  return (
    <div>
      <div className="m-1">
        <button className="btn btn-primary" onClick={login}>
          login
        </button>
        <div>
          this is current user:
          {app.currentUser ? app.currentUser.id : "not logged in"}
        </div>
      </div>
    </div>
  );
}

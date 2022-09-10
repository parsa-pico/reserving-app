import React, { useState } from "react";
import * as Realm from "realm-web";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";
export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [user, setUser] = useState({});
  async function loginAnonymous() {
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    setLoginId(user.id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = Realm.Credentials.emailPassword(
      user.email,
      user.password
    );
    await app.logIn(credentials);
    setLoginId(user.id);
    console.log(app.currentUser.customData);
  };
  function handleUserInfo({ target }) {
    setUser((prevState) => ({
      ...prevState,
      [target.id]: target.value,
    }));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div onChange={handleUserInfo}>
          <Input id={"email"} />
          <Input id={"password"} />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>Or</p>
      <div className="m-1">
        <button className="btn btn-secondary" onClick={loginAnonymous}>
          login anonymously
        </button>
        <div>
          this is current user:
          {app.currentUser ? app.currentUser.id : "not logged in"}
          {app.currentUser && <p>{app.currentUser.providerType}</p>}
        </div>
      </div>
    </div>
  );
}

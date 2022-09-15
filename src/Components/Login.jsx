import React, { useState } from "react";
import * as Realm from "realm-web";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";
export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = Realm.Credentials.emailPassword(
      user.email,
      user.password
    );
    try {
      await app.logIn(credentials);
      window.location = "/";
    } catch (error) {
      alert(error);
    }
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
    </div>
  );
}

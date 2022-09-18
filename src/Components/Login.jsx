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
    const value = target.value.trim();
    console.log(value);
    setUser((prevState) => ({
      ...prevState,
      [target.id]: value,
    }));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div onChange={handleUserInfo}>
          <Input id={"email"} />
          <Input type="password" id={"password"} />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

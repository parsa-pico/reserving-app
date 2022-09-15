import React, { useState } from "react";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";

export default function Register() {
  const [userInfo, setUserInfo] = useState({});
  const handleUserInfo = ({ target }) => {
    const { value, id } = target;
    setUserInfo((prevState) => ({ ...prevState, [id]: value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await app.emailPasswordAuth.registerUser(
        userInfo.email,
        userInfo.password
      );
      alert("please check your email");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <div onChange={handleUserInfo}>
          <Input id="email" />
          <Input id="password" />
        </div>
        <button className="btn btn-primary" type="submit">
          register
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";

export default function Register() {
  const [userInfo, setUserInfo] = useState({});
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);
  const handleUserInfo = ({ target }) => {
    const { id } = target;
    const value = target.value.trim();

    setUserInfo((prevState) => ({ ...prevState, [id]: value }));
    console.log(userInfo);
  };
  // TODO: make loading message programatic
  async function handleRegister(e) {
    e.preventDefault();
    try {
      setFlag(true);
      const result = await app.emailPasswordAuth.registerUser(
        userInfo.email,
        userInfo.password
      );
      setFlag(false);
      setResult("please check your email");
    } catch (e) {
      setFlag(false);
      setResult(e.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div onChange={handleUserInfo}>
          <Input id="email" />
          <Input type="password" id="password" />
        </div>
        <button disabled={flag} className="btn btn-primary" type="submit">
          register
        </button>
        {flag === true && <h2> Loading...</h2>}
        {result && <h6>{result}</h6>}
      </form>
    </div>
  );
}

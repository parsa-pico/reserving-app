import React, { useState } from "react";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";

export default function Register() {
  const [userInfo, setUserInfo] = useState({});
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);
  const handleUserInfo = ({ target }) => {
    const { value, id } = target;
    setUserInfo((prevState) => ({ ...prevState, [id]: value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setFlag(true);
      await app.emailPasswordAuth.registerUser(
        userInfo.email,
        userInfo.password
      );
      setFlag(false);
      setResult("please check your email");
    } catch (e) {
      setFlag(false);
      setResult(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div onChange={handleUserInfo}>
          <Input id="email" />
          <Input id="password" />
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

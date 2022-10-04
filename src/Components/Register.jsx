import React, { useState, useContext } from "react";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";
import LoadingContext from "./context/LoadingContext";

export default function Register() {
  const LoadingState = useContext(LoadingContext);
  const [userInfo, setUserInfo] = useState({});
  const [result, setResult] = useState("");
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
      LoadingState.setIsLoading(true);
      const result = await app.emailPasswordAuth.registerUser(
        userInfo.email,
        userInfo.password
      );
      LoadingState.setIsLoading(false);
      setResult("please check your email");
    } catch (e) {
      LoadingState.setIsLoading(false);
      setResult(e.message);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <div onChange={handleUserInfo}>
          <Input id="email" />
          <Input type="password" id="password" />
        </div>
        <button
          disabled={LoadingState.isLoading}
          className="btn btn-primary"
          type="submit"
        >
          register
        </button>
        {result && <h6>{result}</h6>}
      </form>
    </div>
  );
}

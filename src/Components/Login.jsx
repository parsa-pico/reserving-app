import React, { useState, useContext } from "react";
import * as Realm from "realm-web";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";
import LoadingContext from "./context/LoadingContext";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [user, setUser] = useState({});
  const LoadingState = useContext(LoadingContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = Realm.Credentials.emailPassword(
      user.email,
      user.password
    );
    try {
      LoadingState.setIsLoading(true);
      await app.logIn(credentials);
      LoadingState.setIsLoading(false);
      window.location = "/";
    } catch (error) {
      alert(error);
      LoadingState.setIsLoading(false);
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
    <div disabled={LoadingState.isLoading} className=" login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>sign in</h3>
        <div onChange={handleUserInfo}>
          <Input className="login-inputs" placeholder="email" id={"email"} />
          <Input
            className="login-inputs"
            placeholder="password"
            type="password"
            id={"password"}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

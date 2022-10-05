import React, { useState, useContext } from "react";
import * as Realm from "realm-web";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";
import LoadingContext from "./context/LoadingContext";
import LoadingButton from "./common/LoadingButton";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
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
      setErrors((prevState) => ({
        ...prevState,
        password: handleErrors(error.message),
      }));
      LoadingState.setIsLoading(false);
    }
  };
  function handleUserInfo({ target }) {
    const value = target.value.trim();
    setUser((prevState) => ({
      ...prevState,
      [target.id]: value,
    }));
  }
  function handleErrors(e) {
    //network problem
    if (e.includes("fetch")) return "there is some network problem";
    //invalid credentials
    if (e.includes("invalid")) return "invalid user name or password";
  }
  return (
    <div className=" login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>sign in</h3>
        <div onChange={handleUserInfo}>
          <Input className="login-inputs" placeholder="email" id={"email"} />
          <Input
            error={errors.password}
            className="login-inputs"
            placeholder="password"
            type="password"
            id={"password"}
          />
        </div>
        <LoadingButton
          disabled={LoadingState.isLoading}
          spinner={LoadingState.isLoading}
        >
          Login
        </LoadingButton>
      </form>
    </div>
  );
}

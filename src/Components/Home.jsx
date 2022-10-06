import React, { useContext, useEffect } from "react";
import Cards from "./common/Cards";
import Hero from "./common/Hero";
import LoadingContext from "./context/LoadingContext";
import { app } from "./realmConfig";
import * as Realm from "realm-web";
import { isUser } from "./common/UserControl";
//FIXME: redndering cards conditionaly makes Cards component run many times
export default function Home({ isLoading }) {
  const LoadingState = useContext(LoadingContext);
  async function handleApiLogin() {
    const credentials = Realm.Credentials.apiKey(process.env.REACT_APP_API_KEY);
    try {
      LoadingState.setGeneralSpinner(true);
      await app.logIn(credentials);
      LoadingState.setGeneralSpinner(false);
      console.log("api login");
      window.location = "/";
    } catch (error) {
      alert(error.message);
      LoadingState.setGeneralSpinner(false);
    }
  }
  useEffect(() => {
    if (!isUser()) handleApiLogin();
  }, []);

  return (
    <div id="homePage">
      <Hero />
      <Cards />
    </div>
  );
}

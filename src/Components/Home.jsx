import React, { useContext, useEffect } from "react";
import Cards from "./common/Cards";
import Hero from "./common/Hero";
import LoadingContext from "./context/LoadingContext";
import { app } from "./realmConfig";
import * as Realm from "realm-web";
import { isUser } from "./common/UserControl";
export default function Home({ isLoading }) {
  // const LoadingState = useContext(LoadingContext);
  async function handleApiLogin() {
    const credentials = Realm.Credentials.apiKey(process.env.REACT_APP_API_KEY);
    await app.logIn(credentials);
    console.log("api login");
    window.location = "/";
  }
  useEffect(() => {
    if (!isUser()) handleApiLogin();
  });
  return (
    <div id="homePage">
      <Hero />
      {!isLoading && <Cards />}
    </div>
  );
}

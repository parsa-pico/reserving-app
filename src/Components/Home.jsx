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
    LoadingState.setIsLoading(true);
    await app.logIn(credentials);
    LoadingState.setIsLoading(false);
    console.log("api login");
    window.location = "/";
  }
  useEffect(() => {
    if (!isUser()) handleApiLogin();
  }, []);
  function renderCards() {
    // setTimeout(() => {}, 1000);

    // if (LoadingState.isLoading === false)
    return <Cards />;
    return;
  }
  return (
    <div id="homePage">
      <Hero />
      {renderCards()}
    </div>
  );
}

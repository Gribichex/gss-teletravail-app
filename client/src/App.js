import React from "react";
import Header from "./common/Header";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import { useState } from "react";
import Login from "./Login/Login";
import styles from "./global.module.css";
import { useEffect } from "react";
import { config } from './Constants'
import "bootstrap/dist/css/bootstrap.min.css";
var url = config.url.API_URL;

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = (newState) => {
    setIsAuth(newState);
  };

  useEffect(() => {
    fetch(url+"/auth/check", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Identification rejetée");
        }
        setIsAuth(true);
      })
      .catch((error) => {
        console.log(error);
        setIsAuth(false);
      });
  }, []);

  return (
    <div className={styles.global}>
      <BrowserRouter>
        <Header loginStatus={isAuth} />
        <Switch>
          <Route exact path="/login">
            <Login changeAuthStatus={handleAuth} currentAuth={isAuth} />
          </Route>
          <Route exact path="/">
            <Home changeAuthStatus={handleAuth} currentAuth={isAuth} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

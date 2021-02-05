import React, { Suspense, lazy,useState,useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { config } from "./Constants";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./common/Header";
const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./User/UserManagementPage"));

var url = config.url.API_URL;


function App() {
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = (newState) => {
    setIsAuth(newState);
  };

  useEffect(() => {
    fetch(url + "/auth/check", {
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
        setIsAuth(false);
      });
  }, []);

  return (
 
      <BrowserRouter>
        <Header loginStatus={isAuth} />
        <Suspense fallback={<div>Chargement...</div>}>
          <Switch>
            <Route exact path="/login">
              <Login changeAuthStatus={handleAuth} currentAuth={isAuth} />
            </Route>
            <Route exact path="/">
              <Home changeAuthStatus={handleAuth} currentAuth={isAuth} />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
 
  );
}

export default App;

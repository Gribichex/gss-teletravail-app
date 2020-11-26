import React from "react";
import Header from "./common/Header";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import { useState } from "react";
import Login from "./Login/Login";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuth ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  };

  const handleAuth = (newState) => {
    setIsAuth(newState);
  };

  return (
    <div>
      <BrowserRouter>
        <Header loginStatus={isAuth} />
        <Switch>
          <Route exact path="/login">
            <Login changeAuthStatus={handleAuth} currentAuth = {isAuth}/>
          </Route>
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";

function Login(props) {
  return (
    <div>
      {props.currentAuth ? (
        <LogoutComponent changeAuthStatus={props.changeAuthStatus} />
      ) : (
        <LoginComponent changeAuthStatus={props.changeAuthStatus} />
      )}
    </div>
  );
}

export default Login;

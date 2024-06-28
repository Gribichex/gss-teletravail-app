import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { config } from "./Constants";
import Header from "./common/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./User/UserManagementPage"));

const url = config.url.API_URL;

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = (newState) => {
    setIsAuth(newState);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(url + "/auth/check", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 401) {
          throw new Error("Identification rejetée");
        }
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  });

  return (
    <BrowserRouter>
      <Header loginStatus={isAuth} />
      <Suspense fallback={<div>Chargement...</div>}>
        <Routes>
          <Route 
            path="/login" 
            element={<Login changeAuthStatus={handleAuth} currentAuth={isAuth} />} 
          />
          <Route 
            path="/" 
            element={<Home changeAuthStatus={handleAuth} currentAuth={isAuth} />} 
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
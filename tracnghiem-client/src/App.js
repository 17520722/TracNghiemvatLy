import React, { useEffect, useState } from "react";
import {routes} from "./routes";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Toast from "./components/Toast";
import LoginPage from "./views/login-page";
import SignUpPage from "./views/sign-up";

function showRoute (routes) {
  var result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      );
    });
  }
  return result;
};

function getAuth() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return user;
}

function getUrl() {
  let url = window.location.href.split("/");
  return url[3];
}

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          {
            getAuth() ? showRoute(routes) :
            <>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/sign-up">
                <SignUpPage />
              </Route>
              { getUrl() !== "login" && getUrl() !== "sign-up" && 
              <Redirect to="/login" />}
            </>
          }
        </Switch>
        <Toast />
      </Router>
    </>
  );
}


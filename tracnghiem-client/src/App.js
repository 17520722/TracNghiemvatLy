import React from "react";
import {routes} from "./routes";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Toast from "./components/Toast";

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

export default function App() {
  return (
    <Router>
      <Switch>
        {showRoute(routes)}
      </Switch>
      <Toast />
    </Router>
  );
}


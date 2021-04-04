import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

export default class AdminPage extends Component {
  render() {
    var {routes} = this.props;
    console.log(routes);
    return (
      <div>
        <h2>Admin</h2> 
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    );
  }
}


function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
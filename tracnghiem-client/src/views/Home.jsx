import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Redirect, Switch } from "react-router-dom";

export default class Home extends Component {

  render() {
    return (
      <div>
        <Header />
          <Switch >
            <Redirect to="/home/welcome"/>
          </Switch>
        <Footer />
      </div>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginPage from "./login-page";

export default class HomePage extends Component {
    render () {
        return (
            <>
                <h1>Home Page</h1>
                <a href="/login">Login</a>
            </>
        );
    }
}
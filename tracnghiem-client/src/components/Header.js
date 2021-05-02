import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="/" aria-disabled>
          Logo
        </a>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
          </ul>
          <div>
            <Link to="/login" className="user-log">
              <label htmlFor="icon-user" className="mr-2">
                Đăng nhập
              </label>
              <i id="icon-user" className="fas fa-user"></i>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

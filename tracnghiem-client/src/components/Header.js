import { Backdrop, Button, Menu, MenuItem } from "@material-ui/core";
import { divide } from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      openUserMenu: false,
      anchorEl: null,
    }
  }

  componentDidMount() {
    const userFromSession = JSON.parse(sessionStorage.getItem("user"));
    this.setState({ user: userFromSession });
  }

  handleClick = (event) => {
    console.log(event.currentTarget)
    this.setState({ anchorEl: event.currentTarget });
  };

  handleToggle = () => {
    this.setState({ openUserMenu: !this.state.openUserMenu });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
    window.location.href = '/home/user-detail';
  }

  logOut = () => {
    this.handleClose();
    sessionStorage.removeItem("user");
    this.setState({ user: null });
    
    window.location.href = '/';
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="/" aria-disabled>
          UIT - Trắc nghiệm vật lý
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
          <div className="navbar-nav mr-auto mt-2 mt-lg-0">
            {
              this.state.user?.role === "admin"?
              <div className="nav-menu">
                <div className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin Dashboard
                  </Link>
                </div>
                <div className="nav-item">
                  <Link className="nav-link" to="/test-manager">
                    Đề thi
                  </Link>
                </div>
              </div> : null
            }
            {
              this.state.user?.role === "member"?
              <div className="nav-menu">
                <div className="nav-item">
                  <Link className="nav-link" to="/test-manager">
                    Đề thi
                  </Link>
                </div>
              </div> : null
            }

          </div>
          <div>
            { !this.state.user ? <Link to="/login" className="user-log">
              <label htmlFor="icon-user" className="mr-2">
                Đăng nhập
              </label>
              <i id="icon-user" className="fas fa-user"></i>
            </Link> : 
            <>
              <div onClick={this.handleClick} className="user-name">
                { this.state.user.username }
              </div>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose} style={{fontWeight: "500"}}>Tài khoản</MenuItem>
                <MenuItem onClick={this.logOut} style={{color: "red", fontWeight: "500"}}>Đăng xuất</MenuItem>
              </Menu>
            </> }
          </div>
        </div>
      </nav>
    );
  }
}

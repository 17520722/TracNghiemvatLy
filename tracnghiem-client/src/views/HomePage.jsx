import React, { Component } from "react";
import {Link } from "react-router-dom";
import banner from "../img/banner.png";
import Header from "../components/Header"
import Footer from "../components/Footer"

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home-page-prop">
          <div className="container-fluid banner-prop">
            <img src={banner} alt="banner" />
            <button className="btn btn-start">Bắt đầu</button>
          </div>
          <div className="botton-content">
            <div className="class-button-wrapper">
              <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <Link to="#" className="link-prop">
                    <div className="one-btn-link center">
                      <p className="class-text-prop">Lớp 10</p>
                    </div>
                  </Link>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <Link to="#" className="link-prop">
                    <div className="one-btn-link center">
                      <p className="class-text-prop">Lớp 11</p>
                    </div>
                  </Link>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <Link to="#" className="link-prop">
                    <div className="one-btn-link center">
                      <p className="class-text-prop">Lớp 12</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

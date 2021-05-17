import React, { Component } from "react";
import {Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import banner from "../img/banner.png";

export default class HomePage extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-page-prop">
          <div className="container-fluid banner-prop">
            <img src={banner} alt="banner" />
            <Link className="btn btn-start" to="/home/create-test">Bắt đầu</Link>
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
      </>
    );
  }
}

import React, { Component } from "react";
import {Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import banner from "../img/banner.png";
import { getEvaluatedTestsUser } from "../services/topicEvaluate";

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
              <div className="class-container">
                <Link to="#" className="link-prop">
                    <div className="one-btn-link">
                      <p className="class-text-prop">Lớp 10</p>
                    </div>
                </Link>
                <Link to="#" className="link-prop">
                    <div className="one-btn-link">
                      <p className="class-text-prop">Lớp 11</p>
                    </div>
                </Link>
                <Link to="#" className="link-prop">
                    <div className="one-btn-link">
                      <p className="class-text-prop">Lớp 12</p>
                    </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

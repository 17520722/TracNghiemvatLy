import React, { Component } from "react";
import { connect } from "react-redux";
import {Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getAllQuestion } from "../services/question";
import banner from "../img/banner.png";
import { getEvaluatedTestsUser } from "../services/topicEvaluate";
import * as homepage_actions from "../actions/home_page_actions";

class HomePage extends Component {
  componentDidMount() {
    let questions = JSON.parse(sessionStorage.getItem("questions"));
    if (!questions) {
      getAllQuestion().then(res => res.json()).then(result => {
        sessionStorage.setItem("questions", JSON.stringify(result.data.allQuestion));
      });
    }
  }

  onChooseClass = (classing) => {
    this.props.onSetChoosenClass(classing);
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-page-prop">
          <div className="container-fluid banner-prop">
            <img src={banner} alt="banner" className="img-fluid"/>
            <Link className="btn btn-start" to="/home/create-test">Bắt đầu</Link>
          </div>
          <div className="botton-content">
            <div className="class-button-wrapper">
              <div className="class-container">
                <Link to="/home/create-test" className="link-prop" onClick={() => this.onChooseClass("10")}>
                    <div className="one-btn-link">
                      <p className="class-text-prop">Lớp 10</p>
                    </div>
                </Link>
                <Link to="/home/create-test" className="link-prop" onClick={() => this.onChooseClass("11")}>
                    <div className="one-btn-link">
                      <p className="class-text-prop">Lớp 11</p>
                    </div>
                </Link>
                <Link to="/home/create-test" className="link-prop" onClick={() => this.onChooseClass("12")}>
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

const mapStateToProps = (state) => {
  return {
    choosen_class: state.choosen_class_home,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSetChoosenClass: (classing) => {
      dispatch(homepage_actions.choose_class_homepage(classing))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
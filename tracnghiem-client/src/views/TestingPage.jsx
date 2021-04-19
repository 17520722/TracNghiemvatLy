import React, { Component } from "react";
import "../css/testing-page.css";
import "../constants/genaral_define";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Question from "../components/Question";
import questions from "../constants/questions_demo";
import { QUESTIONS_PER_PAGE } from "../constants/genaral_define";

export default class TestingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  renderQuestion = (questions) => {
    var result = null;
    if (questions.length > 0) {
      result = questions.map((question, index) => {
        var id_index = index + 1;
        return (
          <Question key={id_index} question={question} number={index + 1} />
        );
      });
    }
    return result;
  };

  renderQuestionPerPage = () => {
    var { currentPage } = this.state;
    var questions_collection = this.renderQuestion(questions);
    var result = [];
    var start_question = QUESTIONS_PER_PAGE * (currentPage - 1);
    for (let i = start_question; i < QUESTIONS_PER_PAGE * currentPage; i++) {
      result.push(questions_collection[i]);
    }
    return result;
  };

  showListNumber = () => {
    var result = [];
    for (var i = 1; i <= 40; i++) {
      result.push(
        <div key={i} id={`num${i}`} className="number-of-list">
          {i}
        </div>
      );
    }
    return result;
  };

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  prevPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };

  render() {
    var { currentPage } = this.state;
    console.log(this.state);
    return (
      <div>
        <Header />
        <div className="row mt-3">
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 list-question-part">
            <div className="list-ques-wrapper">
              {this.renderQuestionPerPage()}
              <button
                type="button"
                className="btn btn-warning mt-2 mr-2"
                onClick={this.prevPage}
                hidden={currentPage === 1 ? true : false}
              >
                Trang trước
              </button>
              <button
                type="button"
                className="btn btn-success mt-2"
                onClick={this.nextPage}
                hidden={
                  currentPage ===
                  Math.ceil(questions.length / QUESTIONS_PER_PAGE)
                    ? true
                    : false
                }
              >
                Trang kế
              </button>
              <button
                type="button"
                className="btn btn-danger mt-2"
                hidden={
                  currentPage ===
                  Math.ceil(questions.length / QUESTIONS_PER_PAGE)
                    ? false
                    : true
                }
              >
                Kết thúc
              </button>
            </div>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 list-num-position">
            <div className="list-number-wrapper row">
              {this.showListNumber()}
            </div>
            <div className="time-finnish row">
              <div className="col-6 time-title">Thời gian 60:00</div>
              <div className="col-6 finnish">
                <Link to="/home/tested">
                  <button className="btn btn-danger">Kết thúc</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

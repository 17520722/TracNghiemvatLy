import React, { Component } from "react";
import "../css/testing-page.css";
import "../constants/genaral_define";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Question from "../components/Question";
import { QUESTIONS_PER_PAGE } from "../constants/genaral_define";
import { connect } from "react-redux";
import Timer from "../components/Timer";

class TestingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      questions_arr: [],
    };
  }
  componentDidMount = () => {
    var { test_records, number } = this.props;
    this.setState({
      questions_arr: test_records.setOfQuestions,
    });
  };

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
    var { currentPage, questions_arr } = this.state;
    var result = [];

    if (questions_arr.length === 0) return;
    const questions_collection = this.renderQuestion(questions_arr);
    const start_question = QUESTIONS_PER_PAGE * (currentPage - 1);
    for (let i = start_question; i < QUESTIONS_PER_PAGE * currentPage; i++) {
      result.push(questions_collection[i]);
    }
    return result;
  };

  goToQuestion = async (e) => {
    let elementId = e.target.id;
    let number = parseInt(elementId.slice(3, 5));
    let numberAfterDot = 0;
    let page = 0;
    if (number % 10 === 0) {
      numberAfterDot = 10;
      page = Math.floor(number / 10);
    } else {
      numberAfterDot = number % 10;
      page = Math.floor(number / 10) + 1;
    }
    await this.setState({ currentPage: page });
    let position =
      (window.screen.height / 10) * numberAfterDot + (numberAfterDot - 1) * 120;
    window.scrollTo(0, position);
    console.log(position);
  };

  showListNumber = () => {
    var result = [];
    for (var i = 1; i <= 40; i++) {
      result.push(
        <div
          key={i}
          id={`num${i}`}
          className="number-of-list"
          onClick={this.goToQuestion}
        >
          {i}
        </div>
      );
    }
    return result;
  };

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    window.scrollTo(0, 0);
  };

  prevPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
    window.scrollTo(0, 0);
  };

  onFinnishTest = () => {
    if (window.confirm("Kết thúc bài kiểm tra!")) {
      console.log("A");
    }
  };

  render() {
    var { currentPage, questions_arr } = this.state;
    var { test_records } = this.props;
    console.log(test_records);
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
                  Math.ceil(questions_arr.length / QUESTIONS_PER_PAGE)
                    ? true
                    : false
                }
              >
                Trang kế
              </button>
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={this.onFinnishTest}
                hidden={
                  currentPage ===
                  Math.ceil(questions_arr.length / QUESTIONS_PER_PAGE)
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
              <div className="col-7 time-title">
                <Timer />
              </div>
              <div className="col-5 finnish">
                <Link to="/home/tested">
                  <button className="btn btn-danger">Kết thúc</button>
                </Link>
              </div>
            </div>
          </div>
          <i
            class="fas fa-angle-up to-the-top"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          ></i>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    test_records: state.test_records,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TestingPage);

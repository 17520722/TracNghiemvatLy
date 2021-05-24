import React, { Component } from "react";
import "../css/testing-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import { mathjax_config } from "../constants/config";
import * as test_records_actions from "../actions/test_records_actions";
import { connect } from "react-redux";

const abcArr = ["A", "B", "C", "D"];

class TestedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions_arr: [],
    };
  }

  componentDidMount = () => {
    var { questions_arr } = this.state;
    var { test_records } = this.props;

    if (questions_arr.length === 0) {
      this.setState({
        questions_arr: test_records.setOfQuestions
      });
    }
  };

  renderQuestion = (cauhoi) => {
    var { test_records } = this.props;
    var result = null;
    if (cauhoi.length > 0) {
      result = cauhoi.map((c, index) => {
        return (
          <div key={index} className="font-text">
            <MathJaxContext version={3} config={mathjax_config}>
              <div>
                <b>{`Câu ${index + 1}:`}</b>
                <MathJax>{c.content}</MathJax>
              </div>
              {c.setOfAnswer.map((da, i) => {
                let ans_true = true;
                if (test_records.answerSet[index]) {
                  if (
                    (index + 1) + abcArr[i] ===
                    test_records.answerSet[index].answerId
                  ) {
                    ans_true = false;
                  }
                }
                return (
                  <p
                    key={i}
                    className={`one-answer ${
                      da.isCorrect
                        ? "color-green"
                        : ans_true === false
                        ? "color-red"
                        : ""
                    }`}
                  >
                    <MathJax>{`${abcArr[i]}. ${da.content} `}</MathJax>
                  </p>
                );
              })}
            </MathJaxContext>
          </div>
        );
      });
    }
    return result;
  };

  goToQuestion = (e) => {
    let elementId = e.target.id;
    let number = parseInt(elementId.slice(3, 5));
    let numberAfterDot = 0;
    if (number % 10 === 0) {
      numberAfterDot = 10;
    } else {
      numberAfterDot = number % 10;
    }
    let position =
      (window.screen.height / 7.9) * number + (number - 1) * 120;
    window.scrollTo(0, position);
  }

  showListNumber = () => {
    var { questions_arr } = this.state;
    var { test_records } = this.props;
    var result = [];
    var count = 0;
    for (let i = 0; i < questions_arr.length; i++) {
      let color = "";
      for (let j = 0; j < questions_arr[i].setOfAnswer.length; j++) {
        if (test_records.answerSet[i]) {
          if (
            questions_arr[i].setOfAnswer[j].id ===
            test_records.answerSet[i].answerId
          ) {
            if (questions_arr[i].setOfAnswer[j].isCorrect === true) {
              count++;
              color = "bg-green";
            } else if (questions_arr[i].setOfAnswer[j].isCorrect === false)
              color = "bg-yellow";
          }  else if (test_records.answerSet[i].answerId === "NA") {
            color = "bg-yellow";
          }
        } else {
          color = "bg-yellow";
        }
      }
      result.push(
        <div key={i} id={`num${i + 1}`} className={`number-of-list ${color}`} onClick={this.goToQuestion}>
          {i + 1}
        </div>
      );
    }
    /* Set number of correct answer! */
    this.props.onSetCorrectAns(count);

    return result;
  };

  render() {
    var { questions_arr } = this.state;
    var { test_records } = this.props;
    const numberQuestion = questions_arr.length;
    return (
      <div>
        <Header />
        <div className="row mt-3">
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 list-question-part">
            <div className="list-ques-wrapper">
              {this.renderQuestion(questions_arr)}
            </div>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 list-num-position">
            <div className="list-number-wrapper row">
              {this.showListNumber()}
            </div>
            <div className="time-finnish row">
              <div className="col-12 time-title">{`Kết quả đúng: ${test_records.correctAnsNumber}/${numberQuestion}`}</div>
              <div className="col-12 time-title">{`Điểm: ${((10 / numberQuestion) * test_records.correctAnsNumber).toFixed(2)}`}</div>
              <div className="col-12 time-title">{`Thời gian làm bài còn: ${test_records.time}`}</div>

              <div className="col-6 time-title">
                <Link to="/home/statistic">
                  <button className="btn btn-primary mt-2">Thống kê</button>
                </Link>
              </div>
              <div className="col-6 time-title">
                <Link to="/home/welcome">
                  <button className="btn btn-danger mt-2">Thoát</button>
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
  return {
    onSetCorrectAns: (number) => {
      dispatch(test_records_actions.set_correct_number(number));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestedPage);

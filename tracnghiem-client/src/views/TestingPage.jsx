import React, { Component } from "react";
import "../css/testing-page.css";
import "../constants/genaral_define";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link, Redirect } from "react-router-dom";
import Question from "../components/Question";
import { QUESTIONS_PER_PAGE } from "../constants/genaral_define";
import { connect } from "react-redux";
import Timer from "../components/Timer";
import { withRouter } from "react-router-dom";
import { saveTest } from "../graphql/test.service";
import { addTestForUser, updateUser } from "../graphql/user.service";
import * as is_end_test from "../actions/is_end_test";
import {
  saveEvaluateTopicTest,
  saveEvaluatedTopic,
} from "../services/topicEvaluate";
import { saveQuestionRecord } from "../services/question";

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

    document.addEventListener(
      "copy",
      function (evt) {
        // Change the copied text if you want
        evt.clipboardData.setData(
          "text/plain",
          "Xin đừng tìm đáp án trên mạng!"
        );

        // Prevent the default copy action
        evt.preventDefault();
      },
      false
    );

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
      let {test_records} = this.props;
      let answers = test_records.answerSet;
      let listQuestion = test_records.setOfQuestions;
      let countCorrect = 0;

      for (let ans of answers) {
        let question = listQuestion.find(element => element._id === ans.questionId);
        let objectAnswer = question.setOfAnswer.find(obj => obj.id === ans.answerId);

        if (objectAnswer.isCorrect) {
          countCorrect++;
        }
      }

      let testResult = {
        setOfRemember: test_records.setOfRemember,
        setOfUnderstand: test_records.setOfUnderstand,
        setOfApply: test_records.setOfApply,
        setOfAnalyzing: test_records.setOfAnalyzing,
        levelOfDifficult: test_records.levelOfDifficult,
        correctAnsNumber: countCorrect,
        incorrectAnsNumber: test_records.setOfQuestions.length - countCorrect,
        answerSet: test_records.answerSet
      }

      const user = JSON.parse(sessionStorage.getItem("user"));

      console.log(test_records);
      console.log(testResult.correctAnsNumber)

      saveTest(testResult)
        .then((response) => response.json())
        .then(async (result) => {
          const data = result;
          console.log(data._id);
          if (user) {
            console.log("A");
            await addTestForUser(user.username, user.token, data._id);

            const topicList = this.props.topic_list;
            const miniList = [];
            const testId = data._id;
            const questionList = this.props.test_records.setOfQuestions;
            console.log(questionList);
            let listQuestionRecord = [];

            for (let topic of topicList) {
              let numberQuestionOfTopic = 0;
              let numberCorrectQuestion = 0;

              for (let k = 0; k < questionList.length; k++) {
                if (questionList[k].topic.topicId === topic.topicId) {
                  let questionObj = {
                    _id: questionList[k]._id,
                    countAns:
                      questionList[k].countAns === undefined
                        ? 0
                        : questionList[k].countAns,
                    correctAns:
                      questionList[k].correctAns === undefined
                        ? 0
                        : questionList[k].correctAns,
                    isCorrectAns: false,
                  };

                  numberQuestionOfTopic++;
                  for (let i = 0; i < questionList[k].setOfAnswer.length; i++) {
                    if (
                      this.props.test_records.answerSet[k]?.answerId ===
                        questionList[k].setOfAnswer[i].id &&
                      questionList[k].setOfAnswer[i].isCorrect
                    ) {
                      numberCorrectQuestion++;

                      questionObj = {
                        ...questionObj,
                        isCorrectAns: true,
                      };
                    }
                  }
                  listQuestionRecord.push(questionObj);
                }
              }

              if (numberQuestionOfTopic !== 0) {
                const input = {
                  username: user.username,
                  testId: testId,
                  topicId: topic.topicId,
                  numberCorrectAns: numberCorrectQuestion,
                  numberAns: numberQuestionOfTopic,
                };
                miniList.push(topic);

                await saveEvaluateTopicTest(input, user.token)
                  .then((response) => response.json())
                  .then((result) => {
                    console.log(result);
                  });
              }
            }
            await saveEvaluatedTopic(miniList, user.token)
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
              });
            saveQuestionRecord(listQuestionRecord);
            // for lấy topicId
            //
            //lấy list test từ user
            //mỗi topic tính Năng Lực của user tại topic này bằng cách tìm 20 bài test gần nhất có topic trong nội dung
            //    EvaluatedDoc(userId, topicId, testId);
            //      numberCorrectAns / numberAns;
          }
        });
      this.props.history.push("/home/tested");
      ////////
    }
  };
  test = () => {
    let { currentPage } = this.state;
    for (
      let i = QUESTIONS_PER_PAGE * (currentPage - 1) + 1;
      i <= QUESTIONS_PER_PAGE * currentPage;
      i++
    ) {
      document.getElementById(i + "C").click();
    }
  };

  render() {
    var { currentPage, questions_arr } = this.state;
    var { test_records } = this.props;
    if (this.props.is_end_test === true) {
      return <Redirect to="/home/tested" />;
    }
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
                <button className="btn btn-danger" onClick={this.onFinnishTest}>
                  Kết thúc
                </button>
                <button className="btn" onClick={this.test}>
                  Auto
                </button>
              </div>
            </div>
          </div>
          <i
            className="fas fa-angle-up to-the-top"
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
    is_end_test: state.is_end_test,
    topic_list: state.topic_list,
    questions_arr: state.question_arr,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSetEndTest: () => {
      dispatch(is_end_test.on_set_end_test());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TestingPage));

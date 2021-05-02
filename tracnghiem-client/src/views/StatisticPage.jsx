import { Component } from "react";
import "../css/evaluated-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as test_records from "../actions/test_records_actions";
import topic_list from "../constants/topic_list";
import _ from "lodash";

class StatisticPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question_arr: [],
    };
  }

  componentDidMount = () => {
    var { question_arr } = this.state;
    var { test_records } = this.props;
    console.log(question_arr.length);
    if (question_arr.length === 0) {
      this.setState({
        question_arr: test_records.setOfRemember
          .concat(test_records.setOfUnderstand)
          .concat(test_records.setOfApply)
          .concat(test_records.setOfAnalyzing),
      });
    }
  };

  renderStatistic = () => {
    var { question_arr } = this.state;
    var { test_records } = this.props;
    var result = null;

    var correctRemember = 0;
    var correctUnderstand = 0;
    var correctApply = 0;
    var correctAnalyzing = 0;

    var topicArr = [];
    var questionsOfTopic = [];

    console.log(test_records.answerSet);

    topic_list.forEach((topic) => {
      var topicProps = {
        topicId: topic.id,
        topic: topic,
        numberQuestion: 0,
        remember: 0,
        understand: 0,
        apply: 0,
        analyzing: 0,
      };
      for (let i = 0; i < question_arr.length; i++) {
        if (topicArr.length === 0) {
          if (topic.id === question_arr[i].topic) {
            topicArr.push(topic);
          }
        }
        for (let t = 0; t < topicArr.length; t++) {
          if (_.findIndex(topicArr, ["id", question_arr[i].topic]) === -1) {
            topicArr.push(topic);
          }
        }

        if (question_arr[i].topic === topic.id) {
          topicProps.numberQuestion++;
          switch (question_arr[i].level) {
            case "1":
              topicProps.remember++;
              break;
            case "2":
              topicProps.understand++;
              break;
            case "3":
              topicProps.apply++;
              break;
            case "4":
              topicProps.analyzing++;
              break;
          }
          if (_.findIndex(questionsOfTopic, ["topicId", topic.id]) === -1) {
            questionsOfTopic.push(topicProps);
          }

          for (let j = 0; j < question_arr[i].setOfAnswer.length; j++) {
            if (
              test_records.answerSet[i] &&
              test_records.answerSet[i].answerId ===
                question_arr[i].setOfAnswer[j].id &&
              question_arr[i].setOfAnswer[j].isCorrect === true
            ) {
              if (question_arr[i].level === "1") {
                correctRemember++;
              } else if (question_arr[i].level === "2") {
                correctUnderstand++;
              } else if (question_arr[i].level === "3") {
                correctApply++;
              } else if (question_arr[i].level === "4") {
                correctAnalyzing++;
              }
            }
          }
        }
      }
    });
    console.log(questionsOfTopic);

    if (question_arr.length > 0) {
      result = questionsOfTopic.map((element, index) => {
        return (
          <tr key={index}>
            <td>{element.topic.topic}</td>
            <td>{`${correctRemember} / ${element.remember}`}</td>
            <td>{`${correctUnderstand} / ${element.understand}`}</td>
            <td>{`${correctApply} / ${element.apply}`}</td>
            <td>{`${correctAnalyzing} / ${element.analyzing}`}</td>
            <td>{`${element.numberQuestion}`}</td>
          </tr>
        );
      });
    }

    return result;
  };

  render() {
    var { test_records } = this.props;
    const numberQuestion =
      test_records.correctAnsNumber + test_records.incorrectAnsNumber;
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 side-block">
            <div className="side-block-content"></div>
          </div>
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <div className="row info-test">
              <div className="col-4">{`Mã đề: ${test_records.testId}`}</div>
              <div className="col-4">Đề thứ: 1</div>
              <div className="col-4">{`Điểm: ${(
                (10 / numberQuestion) *
                test_records.correctAnsNumber
              ).toFixed(2)}`}</div>
            </div>

            <div className="pad-right-16 mt-3">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th scope="col" rowSpan="2">
                      Chủ đề
                    </th>
                    <th scope="col" colSpan="4">
                      Số câu đúng
                    </th>
                    <th scope="col" rowSpan="2">
                      Tổng số câu
                    </th>
                  </tr>
                  <tr>
                    <th scope="col">Nhận biết</th>
                    <th scope="col">Thông hiểu</th>
                    <th scope="col">Vận dụng</th>
                    <th scope="col">Vận dụng cao</th>
                  </tr>
                </thead>
                <tbody>{this.renderStatistic()}</tbody>
              </table>
            </div>

            <div className="row btn-nav-bottom">
              <div className="btn-wrapper">
                <Link to="/home/evaluated">
                  <button className="btn btn-primary">Đánh giá</button>
                </Link>
                <button className="btn btn-danger btn-prop">Thoát</button>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StatisticPage);

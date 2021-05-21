import { Component } from "react";
import "../css/evaluated-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as test_records from "../actions/test_records_actions";
import * as act_ans_correct_topic from "../actions/ans_correct_per_topics_actions";
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
        question_arr: test_records.setOfQuestions,
      });
    }
  };

  renderStatistic = () => {
    var { question_arr } = this.state;
    var { test_records, topic_list } = this.props;
    var result = null;

    var topicArr = [];
    var questionsOfTopic = [];

    topic_list.forEach((topic) => {
      var topicProps = {
        topicId: topic.topicId,
        topic: topic,
        numberQuestion: 0,
        remember: 0,
        correctRemember: 0,
        understand: 0,
        correctUnderstand: 0,
        apply: 0,
        correctApply: 0,
        analyzing: 0,
        correctAnalyzing: 0,
      };
      for (let i = 0; i < question_arr.length; i++) {
        if (topicArr.length === 0) {
          if (topic.topicId === question_arr[i].topic.topicId) {
            topicArr.push(topic);
          }
        }
        if (
          _.findIndex(topicArr, ["topicId", question_arr[i].topic.topicId]) ===
          -1
        ) {
          topicArr.push(topic);
        }

        if (question_arr[i].topic.topicId === topic.topicId) {
          topicProps.numberQuestion++;
          switch (question_arr[i].level) {
            case 1:
              topicProps.remember++;
              break;
            case 2:
              topicProps.understand++;
              break;
            case 3:
              topicProps.apply++;
              break;
            case 4:
              topicProps.analyzing++;
              break;
          }

          for (let j = 0; j < question_arr[i].setOfAnswer.length; j++) {
            if (
              test_records.answerSet[i] &&
              test_records.answerSet[i].answerId ===
                question_arr[i].setOfAnswer[j].id &&
              question_arr[i].setOfAnswer[j].isCorrect === true
            ) {
              console.log(question_arr[i].level);
              if (question_arr[i].level === 1) {
                topicProps.correctRemember++;
              } else if (question_arr[i].level === 2) {
                topicProps.correctUnderstand++;
              } else if (question_arr[i].level === 3) {
                topicProps.correctApply++;
              } else if (question_arr[i].level === 4) {
                topicProps.correctAnalyzing++;
              }
            }
          }

          let index_topic = _.findIndex(questionsOfTopic, [
            "topicId",
            topic.topicId,
          ]);
          if (index_topic === -1) {
            questionsOfTopic.push(topicProps);
          } else {
            questionsOfTopic[index_topic] = topicProps;
          }
        }
      }
    });

    if (question_arr.length > 0) {
      result = questionsOfTopic.map((element, index) => {
        let staticItem = {
          topicId: element.topic.topicId,
          topic: element.topic.content,
          remember: {
            correct: element.correctRemember,
            all: element.remember
          },
          understand: {
            correct: element.correctUnderstand,
            all: element.understand
          },
          apply: {
            correct: element.correctApply,
            all: element.apply
          },
          analyzing: {
            correct: element.correctAnalyzing,
            all: element.analyzing
          }
        }
        this.props.onAddStaticToRedux(staticItem);
        return (
          <tr key={index}>
            <td>{element.topic.content}</td>
            <td>{`${element.correctRemember} / ${element.remember}`}</td>
            <td>{`${element.correctUnderstand} / ${element.understand}`}</td>
            <td>{`${element.correctApply} / ${element.apply}`}</td>
            <td>{`${element.correctAnalyzing} / ${element.analyzing}`}</td>
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
    topic_list: state.topic_list,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddStaticToRedux: (item) => {
      dispatch(act_ans_correct_topic.add_ans_correct_per_topic(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticPage);

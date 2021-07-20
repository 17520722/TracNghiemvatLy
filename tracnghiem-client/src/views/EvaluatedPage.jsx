import { Component } from "react";
import "../css/evaluated-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { levelQuestions } from "../constants/genaral_define";
import {
  ANALYZING,
  APPLY,
  REMEMBER,
  REVIEW_TEST_WEAK,
  UNDERSTAND,
} from "../constants/string_const";
import { getOneUser } from "../graphql/user.service";

class EvaluatedPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      testedId: ""
    }
  }

  componentDidMount = async () => {
    if (this.state.testedId === "") {
      const userFromSession = JSON.parse(sessionStorage.getItem("user"));
      await getOneUser(userFromSession._id)
        .then((re) => re.json())
        .then((result) => {
          let arrTemp = result.data.user.listOfTest;
          console.log(arrTemp[arrTemp.length - 1]);
          this.setState({
            testedId: arrTemp[arrTemp.length - 1],
          });
        });
    }
  }

  evaluatedFactor = (item_topic) => {
    let correct =
      item_topic.remember.correct +
      item_topic.understand.correct +
      item_topic.apply.correct +
      item_topic.analyzing.correct;
    let all =
      item_topic.remember.all +
      item_topic.understand.all +
      item_topic.apply.all +
      item_topic.analyzing.all;
    let factor = (correct / all).toFixed(2);
    return factor;
  };

  evaluatedAbility = (factor) => {
    if (factor < 0.5) {
      return "Weak";
    } else if (factor <= 0.75) {
      return "Good";
    } else {
      return "Very good";
    }
  };

  evaluatedText = (item_topic) => {
    let text = "";
    if (item_topic.remember.correct / item_topic.remember.all < 0.5) {
      if (text === "") {
        text = REVIEW_TEST_WEAK + REMEMBER;
      } else {
        text = text + ", " + REMEMBER;
      }
    }
    if (item_topic.understand.correct / item_topic.understand.all < 0.5) {
      if (text === "") {
        text = REVIEW_TEST_WEAK + UNDERSTAND;
      } else {
        text = text + ", " + UNDERSTAND;
      }
    }
    if (item_topic.apply.correct / item_topic.apply.all < 0.5) {
      if (text === "") {
        text = REVIEW_TEST_WEAK + APPLY;
      } else {
        text = text + ", " + APPLY;
      }
    }
    if (item_topic.analyzing.correct / item_topic.analyzing.all < 0.5) {
      if (text === "") {
        text = REVIEW_TEST_WEAK + ANALYZING;
      } else {
        text = text + ", " + ANALYZING;
      }
    }
    return text;
  };

  renderEvaluateTable = () => {
    let result = null;
    let { ACPT } = this.props;
    if (ACPT.length > 0) {
      result = ACPT.map((re, index) => {
        let factor = this.evaluatedFactor(re);
        let text = this.evaluatedAbility(factor);
        return (
          <tr key={index}>
            <td>{re.topic}</td>
            <td>
              {`${factor}: ${text}`}. {this.evaluatedText(re)}
            </td>
          </tr>
        );
      });
    }
    return result;
  };

  render() {
    let { test_records } = this.props;
    const numberOfQuestion = test_records.setOfQuestions.length;
    const point = (
      (10 / numberOfQuestion) *
      test_records.correctAnsNumber
    ).toFixed(2);
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 side-block">
            <div className="side-block-content"></div>
          </div>
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <div className="row info-test">
              <div className="col-4">{`Mã đề: ${this.state.testedId}`}</div>
              <div className="col-4">{`Điểm: ${point}`}</div>
            </div>
            <div className="table-responsive mt-4">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="title-table">Nội dung</th>
                    <th>Đánh giá</th>
                  </tr>
                </thead>
                <tbody>{this.renderEvaluateTable()}</tbody>
              </table>
            </div>
            <div className="row btn-nav-bottom">
              <div className="btn-wrapper">
                <Link to="/home/statistic">
                  <button className="btn btn-primary">Thống kê</button>
                </Link>
                <a href="/">
                  <button className="btn btn-danger btn-prop">Thoát</button>
                </a>
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
    ACPT: state.ans_correct_per_topics,
    test_records: state.test_records,
  };
};

export default connect(mapStateToProps, null)(EvaluatedPage);

import { Component } from "react";
import "../css/evaluated-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { levelQuestions } from "../constants/genaral_define";

class EvaluatedPage extends Component {
  evaluatedFactor = (item_topic) => {
    let f_remember =
      item_topic.remember.all === 0
        ? 0
        : (item_topic.remember.correct / item_topic.remember.all) *
          levelQuestions.remember;
    let f_understand =
      item_topic.understand.all === 0
        ? 0
        : (item_topic.understand.correct / item_topic.understand.all) *
          levelQuestions.understand;
    let f_apply =
      item_topic.apply.all === 0
        ? 0
        : (item_topic.apply.correct / item_topic.apply.all) *
          levelQuestions.apply;
    let f_analyzing =
      item_topic.analyzing.all === 0
        ? 0
        : (item_topic.analyzing.correct / item_topic.analyzing.all) *
          levelQuestions.analyzing;
    let factor =
      (f_remember + f_understand + f_apply + f_analyzing) /
      (levelQuestions.remember +
        levelQuestions.understand +
        levelQuestions.apply +
        levelQuestions.analyzing);
    console.log(item_topic);
    return factor;
  };

  evaluatedText = (factor) => {
    if (factor < 0.5) {
      return "Weak";
    } else if (factor <= 0.75) {
      return "Good";
    } else {
      return "Very good";
    }
  }

  renderEvaluateTable = () => {
    let result = null;
    let { ACPT } = this.props;
    if (ACPT.length > 0) {
      result = ACPT.map((re, index) => {
        let factor = this.evaluatedFactor(re);
        let text = this.evaluatedText(factor);
        return (
          <tr key={index}>
            <td>{re.topic}</td>
            <td>{`${factor}: ${text}`}</td>
          </tr>
        );
      });
    }
    return result;
  };

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 side-block">
            <div className="side-block-content"></div>
          </div>
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <div className="row info-test">
              <div className="col-4">Mã đề: XACBX2201</div>
              <div className="col-4">Đề thứ: 1</div>
              <div className="col-4">Điểm: 10</div>
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
    ACPT: state.ans_correct_per_topics,
  };
};

export default connect(mapStateToProps, null)(EvaluatedPage);

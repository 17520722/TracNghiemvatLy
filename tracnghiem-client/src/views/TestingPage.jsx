import React, { Component } from "react";
import "../css/testing-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Question from "../components/Question";

const questions = [
  {
    content:
      "Một vật chuyển động thẳng đều với vận tốc v. Chọn trục toạ độ ox có phương trùng với phương chuyển động, chiều dương là chiều chuyển động, gốc toạ độ O cách  vị  trí vật xuất phát một  khoảng $OA={x}_{0}$ . Phương trình chuyển động của vật là:",
    setOfAnswer: [
      {
        content: "$x=x_{0}+v_{0} t-\\frac{1}{2} a t^{2}$",
        isCorrect: false,
      },
      {
        content: "$x=x_{0}+{vt}$",
        isCorrect: false,
      },
      {
        content: "$x=v_{0} t+\\frac{1}{2} a t^{2}$",
        isCorrect: true,
      },
      {
        content: "$x=x_{0}+v_{0} t+\\frac{1}{2} a t^{2}$",
        isCorrect: false,
      },
    ],
    level: 2,
    topic: "Bài mẫu",
  },
  {
    content:
      "Một vật chuyển động thẳng đều với vận tốc v. Chọn trục toạ độ ox có phương trùng với phương chuyển động, chiều dương là chiều chuyển động, gốc toạ độ O cách  vị  trí vật xuất phát một  khoảng $OA={x}_{0}$ . Phương trình chuyển động của vật là:",
    setOfAnswer: [
      {
        content: "$x=x_{0}+v_{0} t-\\frac{1}{2} a t^{2}$",
        isCorrect: false,
      },
      {
        content: "$x=x_{0}+{vt}$",
        isCorrect: false,
      },
      {
        content: "$x=v_{0} t+\\frac{1}{2} a t^{2}$",
        isCorrect: true,
      },
      {
        content: "$x=x_{0}+v_{0} t+\\frac{1}{2} a t^{2}$",
        isCorrect: false,
      },
    ],
    level: 2,
    topic: "Bài mẫu",
  },
  {
    content:
      "Một vật chuyển động thẳng đều với vận tốc v. Chọn trục toạ độ ox có phương trùng với phương chuyển động, chiều dương là chiều chuyển động, gốc toạ độ O cách  vị  trí vật xuất phát một  khoảng $OA={x}_{0}$ . Phương trình chuyển động của vật là:",
    setOfAnswer: [
      {
        content: "$x=x_{0}+v_{0} t-\\frac{1}{2} a t^{2}$",
        isCorrect: false,
      },
      {
        content: "$x=x_{0}+{vt}$",
        isCorrect: false,
      },
      {
        content: "$x=v_{0} t+\\frac{1}{2} a t^{2}$",
        isCorrect: true,
      },
      {
        content: "$x=x_{0}+v_{0} t+\\frac{1}{2} a t^{2}$",
        isCorrect: false,
      },
    ],
    level: 2,
    topic: "Bài mẫu",
  },
];

export default class TestingPage extends Component {

  renderQuestion = (questions) => {
    var result = null;
    if (questions.length > 0) {
      result = questions.map((question, index) => {
        return <Question key={index} question={question} number={index + 1} />;
      });
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

  render() {
    return (
      <div>
        <Header />
        <div className="row mt-3">
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 list-question-part">
            <div className="list-ques-wrapper">
              {this.renderQuestion(questions)}
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

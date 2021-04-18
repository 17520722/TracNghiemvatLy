import React, { Component } from "react";
import "../css/testing-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import MathJax from "react-mathjax-preview";

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

const abcArr = ["A", "B", "C", "D"];

export default class TestedPage extends Component {
  renderQuestion = (cauhoi) => {
    var result = null;
    if (cauhoi.length > 0) {
      result = cauhoi.map((c, index) => {
        return (
          <div>
            <p>
              <MathJax math={`Câu ${index + 1}: ${c.content}`}/>
            </p>
            {c.setOfAnswer.map((da, i) => {
              return <p className="one-answer">
                <MathJax math={`${abcArr[i]}. ${da.content} `}/>
              </p>;
            })}
          </div>
        );
      });
    }
    return result;
  };

  showListNumber = () => {
    var result = [];
    for (var i = 1; i <= 40; i++) {
      result.push(<div key={i} className="number-of-list">{i}</div>);
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
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <div className="list-number-wrapper row">
              {this.showListNumber()}
            </div>
            <div className="time-finnish row">
              <div className="col-12 time-title">Kết quả đúng: 50/50</div>
              <div className="col-12 time-title">Điểm: 10</div>
              <div className="col-12 time-title">Thời gian làm bài: 10:34</div>

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
              <div className="col-6 time-title">
                <Link to="/home/evaluated">
                  <button className="btn btn-primary mt-2">Đánh giá</button>
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

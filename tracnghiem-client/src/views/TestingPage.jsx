import React, { Component } from "react";
import "../components/css/testing-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const cauhoi = [
  {
    noidung:
      "Một vật chuyển động thẳng đều với vận tốc v. Chọn trục toạ độ ox có phương trùng với phương chuyển động, chiều dương là chiều chuyển động, gốc toạ độ O cách  vị  trí vật xuất phát một  khoảng $OA={x}_{0}$ . Phương trình chuyển động của vật là:",
    dapan: [
      "$x=x_{0}+v_{0} t-\\frac{1}{2} a t^{2}$",
      "$x=x_{0}+{vt}$",
      "$x=v_{0} t+\\frac{1}{2} a t^{2}$",
      "$x=x_{0}+v_{0} t+\\frac{1}{2} a t^{2}$",
    ],
  },
  {
    noidung:
      "Một vật chuyển động thẳng đều với vận tốc v. Chọn trục toạ độ ox có phương trùng với phương chuyển động, chiều dương là chiều chuyển động, gốc toạ độ O cách  vị  trí vật xuất phát một  khoảng $OA={x}_{0}$ . Phương trình chuyển động của vật là:",
    dapan: [
      "$x=x_{0}+v_{0} t-\\frac{1}{2} a t^{2}$",
      "$x=x_{0}+{vt}$",
      "$x=v_{0} t+\\frac{1}{2} a t^{2}$",
      "$x=x_{0}+v_{0} t+\\frac{1}{2} a t^{2}$",
    ],
  },
];

const abcArr = ["A", "B", "C", "D"];

export default class TestingPage extends Component {
  renderQuestion = (cauhoi) => {
    var result = null;
    if (cauhoi.length > 0) {
      result = cauhoi.map((c, index) => {
        return (
          <div>
            <p>
              Câu {index + 1}: {c.noidung}
            </p>
            {c.dapan.map((da, i) => {
              return <p className="one-answer">{`${abcArr[i]}. ${da} `}</p>;
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
      result.push(
      <div className="number-of-list">{i}</div>
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
              {this.renderQuestion(cauhoi)}
            </div>
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <div className="list-number-wrapper row">
              {this.showListNumber()}
            </div>
            <div className="time-finnish row">
              <div className="col-6 time-title">
                Thời gian 60:00
              </div>
              <div className="col-6 finnish">
                <button className="btn btn-danger">Kết thúc</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

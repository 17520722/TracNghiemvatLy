import { Component } from "react";
import "../css/evaluated-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default class EvaluatedPage extends Component {
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
                <tbody>
                  <tr>
                    <td>Động lực học</td>
                    <td>
                      Đúng 3/6 câu, cần cố gắn hơn nữa để có thể đạt được điểm
                      cao hơn. Đặc biệt cần phải chú trọng ôn lại phần lý thuyết
                      để có thể hiểu rõ nội dung vần đề hơn.
                    </td>
                  </tr>
                  <tr>
                    <td>Điện xoay chiều</td>
                    <td>
                      Đúng 3/6 câu, cần cố gắn hơn nữa để có thể đạt được điểm
                      cao hơn. Ôn lại các công thức, cách chuyển đổi giá trị
                      điện áp, cường độ dòng điện, điện trở....
                    </td>
                  </tr>
                </tbody>
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

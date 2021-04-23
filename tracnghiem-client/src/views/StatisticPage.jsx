import { Component } from "react";
import "../css/evaluated-page.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default class StatisticPage extends Component {
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

            <div className="pad-right-16 mt-3">
              <table class="table table-bordered text-center">
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
                <tbody>
                  <tr>
                    <td>Điện xoay chiểu</td>
                    <td>Điẹn</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Lượng tử năng lượng</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Dao động điều hòa</td>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
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

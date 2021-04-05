import React, { Component } from "react";
import { URL_FACEBOOK, URL_TELEGRAM, URL_TWITTER } from "../constants/linked";

import "./css/footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer-prop">
        <div className="row">
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <p className="logo-prop">WAVI</p>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div className="row">
              <div className="mt-3 col-12">
                <p className="footer-title-test">Đề thi</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <li>Lớp 10</li>
                <li>Lớp 11</li>
                <li>Lớp 12</li>
                <li>Đề THPT</li>
              </div>
              <div className="col-4">
                <li>HKI Lớp 10</li>
                <li>HKI Lớp 11</li>
                <li>HKI Lớp 12</li>
              </div>
              <div className="col-4">
                <li>HKII Lớp 10</li>
                <li>HKII Lớp 11</li>
                <li>HKII Lớp 12</li>
              </div>
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <div className="row">
              <div className="mt-3 col-12">
                <p className="footer-title-test">Liên kết</p>
              </div>
            </div>
            <div className="row">
              <div className="mt-3 col-12">
                <a
                  href={URL_FACEBOOK}
                  target="_blank"
                  rel="noreferrer"
                  className="linked"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href={URL_TWITTER}
                  target="_blank"
                  rel="noreferrer"
                  className="linked"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={URL_TELEGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="linked"
                >
                  <i className="fab fa-telegram-plane"></i>
                </a>
                <i className="fab fa-linkedin-in"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

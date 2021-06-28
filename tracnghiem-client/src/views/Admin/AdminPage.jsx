import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../css/admin/admin-page.css";
import { renderRoutes } from 'react-router-config';
import routes from  './admin.routes';
import { getAllEvaluateUser } from '../../services/topicEvaluate';

export default class AdminPage extends Component {
    constructor(props) {
        super(props);
        let user = JSON.parse(sessionStorage.getItem("user"));

        if (user.role !== "admin") {
            window.location.href = '/';
        }
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user);
        getAllEvaluateUser(user.token).then(response => response.json()).then(result => console.log(result));
    }

    render() {
        return (
            <div className="admin-container">
                <div className="side-bar">
                    <div className="logo">
                        <a href="/">UIT - Trắc nghiệm vật lý</a>
                    </div>
                    <ul className="menu">
                        <li>
                            <NavLink to="/admin/user" className="menu-item" activeClassName="active">
                                Người dùng
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/cau-hoi" className="menu-item" activeClassName="active">
                                Ngân hàng câu hỏi
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/topic" className="menu-item" activeClassName="active">
                                Chủ đề
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/test" className="menu-item" activeClassName="active">
                                Bài kiểm tra
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="body">
                    {renderRoutes(routes)}
                </div>
            </div>
        );
    }
}

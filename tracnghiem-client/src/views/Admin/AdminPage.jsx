import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../css/admin/admin-page.css";
import { renderRoutes } from 'react-router-config';
import routes from  './admin.routes';
import { getAllEvaluateUser } from '../../services/topicEvaluate';

export default class AdminPage extends Component {
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
                        <a href="/">LOGO</a>
                    </div>
                    <ul className="menu">
                        <li>
                            <a href="#" className="menu-item">
                                Người dùng
                            </a>
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
                            <a href="#" className="menu-item">
                                Bài thi
                            </a>
                        </li>
                        <li>
                            <a href="#" className="menu-item">
                                Dạng đề
                            </a>
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

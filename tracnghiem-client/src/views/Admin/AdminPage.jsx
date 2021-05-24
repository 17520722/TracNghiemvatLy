import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../css/admin/admin-page.css";
import { renderRoutes } from 'react-router-config';
import routes from  './admin.routes';

export default class AdminPage extends Component {
    render() {
        return (
            <div className="admin-container">
                <div className="side-bar">
                    <div className="logo">
                        LOGO
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

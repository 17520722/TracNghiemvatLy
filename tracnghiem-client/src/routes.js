import HomePage from "./views/HomePage";
import AdminPage from "./views/Admin/AdminPage";
import DeThiPage from "./views/Admin/DeThi";
import CauHoiPage from "./views/Admin/CauHoi";
import LoginPage from "./views/login-page";
import Page404 from "./views/404";
import SignInPage from "./views/sign-in";
import TestingPage from "./views/TestingPage";
import Home from "./views/Home";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/home/testing",
    exact: false,
    component: TestingPage,
  },
  {
    path: "/home/welcome",
    exact: false,
    component: HomePage,
  },
  {
    path: "/login",
    exact: true,
    component: LoginPage,
  },
  {
    path: "/sign-in",
    exact: true,
    component: SignInPage,
  },
  {
    path: "/admin",
    exact: true,
    component: AdminPage,
  },
  {
    path: "/admin/cau-hoi",
    exact: false,
    component: CauHoiPage,
  },
  {
    path: "/admin/de-thi",
    exact: false,
    component: DeThiPage,
  },
  {
    path: "**",
    exact: true,
    component: Page404,
  },
];

export {
  routes,
};
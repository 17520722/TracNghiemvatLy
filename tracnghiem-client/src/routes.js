import HomePage from "./views/HomePage";
import AdminPage from "./views/Admin/AdminPage";
import DeThiPage from "./views/Admin/DeThi";
import CauHoiPage from "./views/Admin/CauHoi";
import LoginPage from "./views/login-page";
import Page404 from "./views/404";
import SignInPage from "./views/sign-in";
import TestingPage from "./views/TestingPage";
import Home from "./views/Home";
import TestedPage from "./views/TestedPage";
import EvaluatedPage from "./views/EvaluatedPage";
import StatisticPage from "./views/StatisticPage";
import CreatedPage from "./views/CreatedTestPage";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/home",
    exact: true,
    component: Home,
  },
  {
    path: "/home/welcome",
    exact: false,
    component: HomePage,
  },
  {
    path: "/home/testing",
    exact: false,
    component: TestingPage,
  },
  {
    path: "/home/tested",
    exact: false,
    component: TestedPage,
  },
  {
    path: "/home/evaluated",
    exact: false,
    component: EvaluatedPage,
  },
  {
    path: "/home/statistic",
    exact: false,
    component: StatisticPage,
  },
  {
    path: "/home/create-test",
    exact: false,
    component: CreatedPage,
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
    path: "/admin/topic",
    exact: true,
    component: AdminPage
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
import HomePage from "./views/HomePage";
import AdminPage from "./views/Admin/AdminPage";
import DeThiPage from "./views/Admin/DeThi";
import LoginPage from "./views/login-page";
import Page404 from "./views/404";
import SignUpPage from "./views/sign-up";
import TestingPage from "./views/TestingPage";
import Home from "./views/Home";
import TestedPage from "./views/TestedPage";
import EvaluatedPage from "./views/EvaluatedPage";
import StatisticPage from "./views/StatisticPage";
import CreatedPage from "./views/CreatedTestPage";
import UserDetailPage from "./views/UserDetailPage";
import ExportTest from "./views/ExportTest";
import ExportDocumentTest from "./views/ExportDocumentTest";
import TestManager from "./views/TestManager";

const routes = [{
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
    path: "/home/user-detail",
    exact: false,
    component: UserDetailPage,
  },
  {
    path: "/home/export-test-2",
    exact: false,
    component: ExportTest,
  },
  {
    path: "/home/export-test",
    exact: false,
    component: ExportDocumentTest,
  },
  {
    path: "/test-manager",
    exact: false,
    component: TestManager,
  },
  {
    path: "/login",
    exact: true,
    component: LoginPage,
  },
  {
    path: "/sign-up",
    exact: true,
    component: SignUpPage,
  },
  {
    path: "/admin",
    exact: true,
    component: AdminPage,
  },
  {
    path: "/admin/cau-hoi",
    exact: true,
    component: AdminPage,
  },
  {
    path: "/admin/test",
    exact: false,
    component: AdminPage,
  },
  {
    path: "/admin/topic",
    exact: true,
    component: AdminPage
  },
  {
    path: "/admin/user",
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

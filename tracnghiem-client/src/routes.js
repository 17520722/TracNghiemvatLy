import HomePage from "./views/HomePage";
import AdminPage from "./views/Admin/AdminPage";
import DeThiPage from "./views/Admin/DeThi";
import CauHoiPage from "./views/Admin/CauHoi";
import LoginPage from "./views/login-page";
import Page404 from "./views/404";
import SignInPage from "./views/sign-in";

const routes = [
  
  {
    path: "/home",
    exact: true,
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
    exact: false,
    component: AdminPage,
    routes: [
      {
        path: "/admin/de-thi",
        exact: false,
        component: DeThiPage,
      },
      {
        path: "/admin/cau-hoi",
        exact: false,
        component: CauHoiPage,
      },
    ]
  },
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "**",
    exact: true,
    component: Page404,
  },
];

export default routes;

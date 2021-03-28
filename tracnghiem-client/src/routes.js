import HomePage from "./views/HomePage";
import AdminPage from "./views/Admin/AdminPage";
import DeThiPage from "./views/Admin/DeThi";
import CauHoiPage from "./views/Admin/CauHoi";

const routes = [
  {
    path: "/home",
    exact: false,
    component: HomePage,
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
];

export default routes;

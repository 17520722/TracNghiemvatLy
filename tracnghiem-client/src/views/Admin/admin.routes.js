import CauHoiPage from "./CauHoi"
import DeThiPage from "./DeThi"
import Topic from "./Topic"
import UserPage from "./User"

const routes = [
     {
          path: "/admin/topic",
          exact: true,
          component: Topic
     },
     {
          path: "/admin/cau-hoi",
          exact: true,
          component: CauHoiPage
     },
     {
          path: "/admin/test",
          exact: true,
          component: DeThiPage
     },
     {
          path: "/admin/user",
          exact: true,
          component: UserPage
     },
]

export default routes

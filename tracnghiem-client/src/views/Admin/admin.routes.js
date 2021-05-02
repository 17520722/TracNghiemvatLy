import CauHoiPage from "./CauHoi"
import Topic from "./Topic"

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
     }
]

export default routes

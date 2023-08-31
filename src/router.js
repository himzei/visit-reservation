import { Outlet, createBrowserRouter } from "react-router-dom";
import NotFound from "./app/NotFound";
import Page from "./Page";
import LogIn from "./app/LogIn";
import SecurityStatus from "./app/security/SecurityStatus";
import SecurityRegister from "./app/security/SecurityRegister";
import TeacherApproval from "./app/teacher/TeacherApproval";
import TeacherHistory from "./app/teacher/TeacherHistory";
import TeacherRegister from "./app/teacher/TeacherRegister";
import TeacherProfile from "./app/teacher/TeacherProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Page />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "security",
        element: <Outlet />,
        children: [
          {
            path: "status",
            element: <SecurityStatus />,
          },
          {
            path: "register",
            element: <SecurityRegister />,
          },
        ],
      },
      {
        path: "teacher",
        element: <Outlet />,
        children: [
          {
            path: "approval",
            element: <TeacherApproval />,
          },
          {
            path: "history",
            element: <TeacherHistory />,
          },
          {
            path: "register",
            element: <TeacherRegister />,
          },
          {
            path: "profile",
            element: <TeacherProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;

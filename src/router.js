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
import AdminConfirm from "./app/admin/AdminConfirm";
import AdminRegister from "./app/admin/AdminRegister";
import AdminManager from "./app/admin/AdminManager";
import AdminMainPage from "./app/admin/AdminMainPage";
import AdminUser from "./app/admin/AdminUser";
import AdminPolicy from "./app/admin/AdminPolicy";
import AdminStatics from "./app/admin/AdminStatics";
import AdminProfile from "./app/admin/AdminProfile";
import AdminHistory from "./app/admin/AdminHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminToday from "./app/admin/AdminToday";
import SecurityToday from "./app/security/SecurityToday";
import TeacherToday from "./app/teacher/TeacherToday";

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
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "status",
            element: <SecurityStatus />,
          },
          {
            path: "today",
            element: <SecurityToday />,
          },
        ],
      },
      {
        path: "teacher",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "today",
            element: <TeacherToday />,
          },
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
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "today",
            element: <AdminToday />,
          },
          {
            path: "confirm",
            element: <AdminConfirm />,
          },
          {
            path: "history",
            element: <AdminHistory />,
          },
          {
            path: "register",
            element: <AdminRegister />,
          },
          {
            path: "manager",
            element: <AdminManager />,
          },
          {
            path: "main",
            element: <AdminMainPage />,
          },
          {
            path: "user",
            element: <AdminUser />,
          },
          {
            path: "policy",
            element: <AdminPolicy />,
          },
          {
            path: "statistics",
            element: <AdminStatics />,
          },
          {
            path: "profile",
            element: <AdminProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;

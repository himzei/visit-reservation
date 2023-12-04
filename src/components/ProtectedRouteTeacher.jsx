import { Navigate } from "react-router-dom";
import useTokenLogin from "../hooks/useTokenLogin";

export default function ProtectedRouteTeacher({ children }) {
  const { data, isLoading } = useTokenLogin();
  if (!isLoading) {
    if (data?.auth === 0 || data?.auth === 1) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }
}

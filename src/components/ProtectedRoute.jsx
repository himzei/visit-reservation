import { Navigate } from "react-router-dom";
import useTokenLogin from "../hooks/useTokenLogin";

export default function ProtectedRoute({ children }) {
  const { data, isLoading } = useTokenLogin();

  if (!isLoading && data?.auth !== 0) {
    return <Navigate to="/login" />;
    // return children;
  } else {
    return children;
  }
}

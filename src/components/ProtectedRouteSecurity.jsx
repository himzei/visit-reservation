import { Navigate } from "react-router-dom";
import useTokenLogin from "../hooks/useTokenLogin";

export default function ProtectedRouteSecurity({ children }) {
  const { data, isLoading } = useTokenLogin();
  console.log(data);

  if (!isLoading) {
    if (data?.auth === 0 || data?.auth === 2) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }
}

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use/user";

const AdminRoute = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use/user";

interface ProtectedRouteProps {
  children: JSX.Element;
  requireAdmin?: boolean;
}
export const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

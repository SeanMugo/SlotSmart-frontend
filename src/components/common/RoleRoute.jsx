import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RoleProtectedRoute({
  children,
  allowedRoles,
}) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
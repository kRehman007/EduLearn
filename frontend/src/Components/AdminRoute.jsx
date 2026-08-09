import { useAuth } from "./Hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoaderIcon from "./Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoaderIcon />;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;
  return children;
};

export default AdminRoute;

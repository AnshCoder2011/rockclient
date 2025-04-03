import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAdmin = localStorage.getItem("adminToken"); // Check token
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoute;

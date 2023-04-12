import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { currentToken } from "./authSlice";

const AdminRequireAuth = () => {
    const admin = useSelector(currentToken)
 
  const location = useLocation();

  return admin ? (
    <Outlet />
  ) : (
    <Navigate to="/adminlogin" state={{ from: location }} replace />
  );
};
export default AdminRequireAuth;
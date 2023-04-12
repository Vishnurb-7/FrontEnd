import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { managersData } from "./managersAuthSlice";



const ManagersRequireAuth = () => {
  const manager = useSelector(managersData)

  const location = useLocation();

  return manager != "" ? (
    <Outlet />
  ) : (
    <Navigate to="/providerLogin" state={{ from: location }} replace />
  );
};
export default ManagersRequireAuth;